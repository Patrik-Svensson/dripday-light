import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";
import { User } from "@patrik-svensson/models";

interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
  userDocument?: any;
}

const findUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const firebaseUid = req.user?.uid;

  try {
    const user = await User.findOne({ firebaseUid }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.userDocument = user;
    next();
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Error finding user" });
  }
};

export default findUser;
