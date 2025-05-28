import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  email: string;
  preferedMarket: string;
  likes: mongoose.Types.ObjectId[];
  role: "admin" | "user";
  styleboards: mongoose.Types.ObjectId[];
  firebaseUid: string;
  recommendationVector: number[];
  createdAt?: Date;
  updatedAt?: Date;
}

export { IUser };
