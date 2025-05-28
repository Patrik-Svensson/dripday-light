import { Document, ObjectId } from "mongoose";
import { IMarket } from "./IMarket.js";

interface IProduct extends Document {
  galleryImageUrls: string[];
  embeddedImageUrl: string;
  processedEmbeddedImageUrl: string;
  thumbnailUrl: string;
  name: string;
  brand: string;
  sourceProductId: string;
  sourceColor: string;
  sourceCategory: string;
  color: string;
  category: string;
  subCategory: string;
  gender: "male" | "female";
  vectorDbId: string;
  markets: IMarket[];
  scrapeStatus: "done" | "pending" | "not scraped";
  prompts: string[];
  productPrompt: string;
  content: ObjectId[];
  lastScraped?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IProduct };
