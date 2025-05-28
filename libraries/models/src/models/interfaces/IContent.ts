import { Document } from "mongoose";
import mongoose from "mongoose";

interface IContent extends Document {
    imageUrl: string;
    squareImageUrl: string;
    gender: string;
    generationModel: string;
    isPublished: boolean;
    product: mongoose.Types.ObjectId;
}

export { IContent };
