import mongoose, { Schema } from "mongoose";

import { IUser } from "../interfaces/IUser.js";

const userSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "Post" }],
      default: [],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    styleboards: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Styleboard",
        },
      ],
      default: [],
    },
    firebaseUid: {
      type: String,
      default: null,
    },
    recommendationVector: {
      type: [Number],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);
export { User };
