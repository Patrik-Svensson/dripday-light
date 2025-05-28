import express, { Request, Router, Response } from "express";
import mongoose from "mongoose";
import { Post, IUser, User } from "@patrik-svensson/models";
import isAuthenticated from "../middleware/isAuthenticated.js";
import findUser from "../middleware/findUser.js";
import admin from "firebase-admin";
import axios from "axios";
import { Pinecone } from '@pinecone-database/pinecone';
import {
  CLIP_SERVICE_URL,
} from "../config/index.js";

const pinecone = new Pinecone({ apiKey: 'YOUR_API_KEY' });
const index = pinecone.Index('your-index-name');

interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
  userDocument?: IUser; 
}

const router: Router = express.Router();

router.get("/", isAuthenticated, async (req: AuthRequest, res: Response) => {
  try {
    const posts = await Post.find({}).exec();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

router.get("/feed/public", async (req: AuthRequest, res: Response) => {
  const limit = parseInt(req.query.limit as string, 10) || 10;

  try {
    const randomPosts = await Post.aggregate([{ $sample: { size: limit } }]).exec();
    res.status(200).json({ posts: randomPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});


router.get("/feed/private", isAuthenticated, findUser, async (req: AuthRequest, res: Response) => {
  const limit = parseInt(req.query.limit as string, 10) || 10;
  const user = req.userDocument;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    const randomPosts = await Post.aggregate([{ $sample: { size: limit } }]).exec();

    const responsePosts = randomPosts.map((post: any) => ({
      ...post,
      isLiked: user.likes.includes(post._id.toString()),
    }));

    res.status(200).json({
      posts: responsePosts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});


router.post(
  "/:postId/likes",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;
    const { isLiked } = req.body;
    const user: IUser | undefined = req.userDocument; 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    try {
      const postObjectId = new mongoose.Types.ObjectId(postId);

      if (isLiked) {
        if (!user.likes.some((id) => id.equals(postObjectId))) {
          user.likes.push(postObjectId);
        }
      } else {
        user.likes = user.likes.filter((id) => !id.equals(postObjectId));
      }

      await User.findByIdAndUpdate(user._id, { likes: user.likes }).exec();

      const post = await Post.findById(postId).exec();
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (isLiked) {
        const userId = user._id as mongoose.Types.ObjectId;

        if (!post.likes.some((id) => id.equals(userId))) {
          post.likes.push(userId);
        }
      } else {
        const userId = user._id as mongoose.Types.ObjectId;
        post.likes = post.likes.filter((id) => !id.equals(userId));
      }

      await post.save();

      res.status(200).json({ isLiked });
    } catch (error) {
      console.error("Error updating user likes:", error);
      res.status(500).json({ message: "Error updating user likes" });
    }
  }
);

router.get(
  "/:postId/likes/status",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;
    const user: any = req.userDocument;

    try {
      const postObjectId = new mongoose.Types.ObjectId(postId);
      const isLiked = user.likes.some(
        (id: any) => id.toString() === postObjectId.toString()
      );
      res.status(200).json({ isLiked });
    } catch (error) {
      console.error("Error fetching user likes:", error);
      res.status(500).json({ message: "Error fetching user likes" });
    }
  }
);

router.post("/:postId/like", isAuthenticated, findUser, async (req: any, res: any) => {
  const { postId } = req.params;
  const { isLiked } = req.body;

  const user: any = req.userDocument;

  try {
    if (isLiked) {
      if (!user.likes.some((id: any) => id.toString() === postId)) {
        user.likes.push(postId);
      }
    } else {
      user.likes = user.likes.filter((id: any) => id.toString() !== postId);
    }

    await user.save();

    const post = await Post.findById(postId).exec();
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (isLiked) {
      if (!post.likes.some((id: any) => id.toString() === user._id.toString())) {
        post.likes.push(user._id);
      }
    } else {
      post.likes = post.likes.filter((id: any) => id.toString() !== user._id.toString());
    }

    await post.save();

    res.status(200).json({ isLiked });
  } catch (error) {
    console.error("Error updating user likes:", error);
    res.status(500).json({ message: "Error updating user likes" });
  }

});

router.post("/search", async (req: any, res: any) => {
  const searchText = req.body.searchText;
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 40;
  const offset = (page - 1) * limit;
  const totalPosts = await Post.countDocuments().exec();

  try {
    const queryEmbedding = await textEmbedder(searchText);

    const pineconeQuery = await index.query({
      vector: queryEmbedding,
      topK: offset + limit, 
      includeMetadata: true,
    });

    const pageMatches = pineconeQuery.matches?.slice(offset, offset + limit) || [];

    const searchIds = pageMatches
      .filter((match: any) => match !== undefined)
      .map((match: any) => match.id);

    const posts = await Post.aggregate([
      { $match: { searchId: { $in: searchIds } } },
      {
        $addFields: {
          order: { $indexOfArray: [searchIds, "$searchId"] },
        },
      },
      { $sort: { order: 1 } },
    ]).exec();

    res.status(200).json({
      posts,
      page,
      limit,
      totalResults: pineconeQuery.matches?.length || 0,
      totalPages: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function textEmbedder(text: any) {
  try {
    const response = await axios.post(`${CLIP_SERVICE_URL}/open-fashion-clip/embed-text`, {
      text: text,
    });

    return response.data.features;
  } catch (error: any) {
    console.error(error);
  }
}

export default router;
