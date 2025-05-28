import mongoose, { Document } from "mongoose";
import { IProductMatch } from "./IProductMatch";
import { IProductFound } from "./IProductFound";
import { IImages } from "./IImages";

interface IPost extends Document {
  image: IImages;
  embeddedImage: string;
  gender: "male" | "female";
  productMatches: IProductMatch[];
  productsFound: IProductFound[];
  likes: mongoose.Types.ObjectId[]; 
  searchId: string;
  lastProductMatchUpdate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IPost };
