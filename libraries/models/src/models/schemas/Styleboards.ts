import mongoose, { Schema, Document } from "mongoose";

import { IStyleboard } from "../interfaces/IStyleboard.js";

const styleboardSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Styleboard = mongoose.model<IStyleboard>("Styleboard", styleboardSchema);
export { Styleboard };
