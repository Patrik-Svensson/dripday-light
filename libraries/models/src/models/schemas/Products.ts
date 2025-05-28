import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct.js";
import { IMarket } from "../interfaces/IMarket.js";

const marketSchema: Schema<IMarket> = new Schema(
  {
    productLink: { type: String },
    country: { type: String },
    saleStatus: { type: String },
    price: { type: String },
    currency: { type: String },
    lastScraped: { type: Date },
  },
  {
    _id: false,
    timestamps: true,
  }
);

const productSchema: Schema<IProduct> = new Schema(
  {
    galleryImageUrls: [{ type: String }],
    embeddedImageUrl: { type: String },
    processedEmbeddedImageUrl: { type: String },
    thumbnailUrl: { type: String },
    name: { type: String },
    brand: { type: String },
    sourceProductId: { type: String },
    sourceColor: { type: String },
    sourceCategory: { type: String },
    color: { type: String }, 
    category: { type: String },
    subCategory: { type: String },  
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    vectorDbId: { type: String },
    markets: { type: [marketSchema], default: [] },
    scrapeStatus: { type: String, enum: ["done", "pending", "not scraped"] },
    prompts: [{ type: String }],
    productPrompt: { type: String },
    content: [{ type: Schema.Types.ObjectId, ref: "Content" }],
    lastScraped: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export { Product };
