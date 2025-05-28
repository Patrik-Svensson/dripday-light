import mongoose, { Document } from "mongoose";

interface IStyleboard extends Document {
  name: string;
  posts: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IStyleboard };
