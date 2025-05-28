import mongoose, { Schema } from "mongoose";
import { IContent } from "../interfaces/IContent.js";

const contentSchema: Schema = new Schema(
  {
    imageUrl: { type: String },
    squareImageUrl: { type: String },
    gender: { type: String, enum: ["male", "female"], required: true }, 
    generationModel: { type: String, required: true },
    isPublished: { type: String, required: true }, 
    product: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model<IContent>("Content", contentSchema);
export { Content };
