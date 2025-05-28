import { Document } from "mongoose";

interface IImages extends Document {
  miniImageUrl: string;
  smallImageUrl: string;
  mediumImageUrl: string;
  largeImageUrl: string;
  hugeImageUrl: string;
}

export { IImages };
