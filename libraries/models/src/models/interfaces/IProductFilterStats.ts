import { Document } from "mongoose";

interface IProductFilterStats extends Document {
  border: string[];
  masking: string[];
  category: string[];
  monochrome: string[];
  behind: string[];
}

export { IProductFilterStats };
