import express, { Request, Router } from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { Styleboard } from "@patrik-svensson/models";
import admin from "firebase-admin";
import { ObjectId } from "mongoose";
import findUser from "../middleware/findUser.js";

interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
  userDocument?: any;
}

const router: Router = express.Router();

router.get("/", isAuthenticated, findUser, async (req: AuthRequest, res) => {
  try {
    const user = req.userDocument;
    await user.populate("styleboards");

    res.status(200).json(user.styleboards);
  } catch (error) {
    console.error("Error fetching styleboards:", error);
    res.status(500).json({ message: "Error fetching styleboards" });
  }
});

router.post("/", isAuthenticated, findUser, async (req: AuthRequest, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const user = req.userDocument;
    const styleboard = new Styleboard({
      owner: user._id,
      name: name,
      posts: [],
    });

    await styleboard.save();
    user.styleboards.push(styleboard._id);
    await user.save();
    res.status(201).json(styleboard);
  } catch (error) {
    console.error("Error creating styleboard:", error);
    res.status(500).json({ message: "Error creating styleboard" });
  }
});

router.get(
  "/with-posts",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res) => {
    try {
      const user = req.userDocument;
      await user.populate({
        path: "styleboards",
        populate: { path: "posts" },
      });
      res.status(200).json(user.styleboards);
    } catch (error) {
      console.error("Error fetching styleboards with posts:", error);
      res
        .status(500)
        .json({ message: "Error fetching styleboards with posts" });
    }
  }
);

router.delete(
  "/:styleboardId/posts/:postId",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res) => {
    const { styleboardId, postId } = req.params;

    try {
      const user = req.userDocument;
      const styleboard = await Styleboard.findById(styleboardId).exec();
      if (!styleboard || !user.styleboards.includes(styleboard._id)) {
        return res.status(404).json({ message: "Styleboard not found" });
      }

      styleboard.posts = styleboard.posts.filter(
        (post) => post.toString() !== postId
      );
      await styleboard.save();
      res.status(200).json(styleboard);
    } catch (error) {
      console.error("Error removing post from styleboard:", error);
      res.status(500).json({ message: "Error removing post from styleboard" });
    }
  }
);

router.delete(
  "/:styleboardId",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res) => {
    const { styleboardId } = req.params;
    try {
      const user = req.userDocument;
      const styleboard = user.styleboards.find(
        (styleboard: ObjectId) => styleboard.toString() === styleboardId
      );
      if (!styleboard) {
        return res.status(404).json({ message: "Styleboard not found" });
      }
      await Styleboard.deleteOne({ _id: styleboardId }).exec();
      user.styleboards = user.styleboards.filter(
        (styleboard: ObjectId) => styleboard.toString() !== styleboardId
      );
      await user.save();
      res.status(200).json({ message: "Styleboard deleted" });
    } catch (error) {
      console.error("Error deleting styleboard:", error);
      res.status(500).json({ message: "Error deleting styleboard" });
    }
  }
);

router.patch(
  "/:styleboardId",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res) => {
    const { styleboardId } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      const styleboard = await Styleboard.findById(styleboardId).exec();
      if (!styleboard) {
        return res.status(404).json({ message: "Styleboard not found" });
      }

      styleboard.name = name;
      await styleboard.save();

      res.status(200).json(styleboard);
    } catch (error) {
      console.error("Error renaming styleboard:", error);
      res.status(500).json({ message: "Error renaming styleboard" });
    }
  }
);

router.post(
  "/:styleboardId/posts",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res) => {
    const { styleboardId } = req.params;
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }
    try {
      const user = req.userDocument;
      const styleboard = await Styleboard.findById(styleboardId).exec();
      if (!styleboard || !user.styleboards.includes(styleboard._id)) {
        return res.status(404).json({ message: "Styleboard not found" });
      }

      if (!styleboard.posts.includes(postId)) {
        styleboard.posts.push(postId);
        await styleboard.save();
      }

      res.status(200).json(styleboard);
    } catch (error) {
      console.error("Error adding post to styleboard:", error);
      res.status(500).json({ message: "Error adding post to styleboard" });
    }
  }
);

export default router;
