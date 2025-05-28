import express, { Request, Router, Response } from "express";
import { User, Post } from "@patrik-svensson/models";
import isAuthenticated from "../middleware/isAuthenticated.js";
import admin from "firebase-admin";
import findUser from "../middleware/findUser.js";

interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
  userDocument?: any;
}

const router: Router = express.Router();

router.get(
  "/likes",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res: Response) => {
    try {
      const user = req.userDocument;
      await user.populate("likes");
      const likedPosts = user.likes;
      res.status(200).json(likedPosts);
    } catch (error) {
      console.error("Error fetching liked posts:", error);
      res.status(500).json({ message: "Error fetching liked posts" });
    }
  }
);

router.post(
  "/",
  isAuthenticated,
  async (req: AuthRequest, res: Response) => {
    const { email, uid } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = new User({ email, firebaseUid: uid });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  }
);

router.patch(
  "/change-password",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res: Response) => {
    const { newPassword } = req.body;
    const uid = req.user?.uid;

    if (!newPassword || newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    if (!uid) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    try {
      await admin.auth().updateUser(uid, { password: newPassword });
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Error updating password" });
    }
  }
);

router.delete(
  "/",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res: Response) => {
    try {
      const uid = req.user?.uid;

      if (!uid) {
        return res.status(400).json({ message: "User ID is missing" });
      }

      await admin.auth().deleteUser(uid);

      const user = await User.findOneAndDelete({ uid }).exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const posts = await Post.find({ user: user._id }).exec();
      await Post.deleteMany({ user: user._id }).exec();

      const bucket = admin.storage().bucket();

      posts.forEach((post: any) => {
        post.imageUrls.forEach((imageUrl: string) => {
          const filename: any = imageUrl.split("/").pop();
          const file = bucket.file(filename);
          file.delete().catch((error) => {
            console.error("Error deleting image:", error);
          });
        });
      });

      res.status(200).json({
        message:
          "User, user's posts, and Firebase Authentication account deleted",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Error deleting user" });
    }
  }
);

export default router;
