import mongoose, { Schema } from "mongoose";
import { IPost } from "../interfaces/IPost.js";
import { IProductMatch } from "../interfaces/IProductMatch.js";
import { IProductFound } from "../interfaces/IProductFound.js";

const productMatchSchema: Schema<IProductMatch> = new Schema(
  {
    imageUrls: { type: [String], required: true },
    thumbnailUrl: { type: String, required: true },
    price: { type: String, required: true },
    currency: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    productLink: { type: String, required: true },
    score: { type: Number, required: true },
    searchImageUrl: { type: String, required: true },
    matchedImageUrl: { type: String, required: true },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const productFoundSchema: Schema<IProductFound> = new Schema(
  {
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    imageUrl: { type: String, required: true },
    color: { type: String, required: true },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const imageSchema: Schema = new Schema(
  {
    hugeImageUrl: { type: String },
    largeImageUrl: { type: String },
    mediumImageUrl: { type: String },
    smallImageUrl: { type: String },
    miniImageUrl: { type: String },
  },
  {
    _id: false,
    timestamps: false,
  }
);

const postSchema: Schema<IPost> = new Schema(
  {
    image: { type: imageSchema, default: {} },
    embeddedImage: { type: String },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    productMatches: { type: [productMatchSchema], default: [] },
    productsFound: { type: [productFoundSchema], default: [] },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    searchId: { type: String },
    lastProductMatchUpdate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export { Post };
