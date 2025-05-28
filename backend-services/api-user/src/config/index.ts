import path from "path";
import dotenv from "dotenv";

const env = process.env.NODE_ENV || "dev";
let envFile = ".env";

switch (env) {
  case "dev":
    envFile = ".env.dev";
    break;
  case "staging":
    envFile = ".env.staging";
    break;
  case "prod":
    envFile = ".env.prod";
    break;
}

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const PORT: string = process.env.PORT || "";
export const DB_CONNECTION_STRING: string =
  process.env.DB_CONNECTION_STRING || "";
export const CLIP_SERVICE_URL: string = process.env.CLIP_SERVICE_URL || "";
export const VECTOR_DB_POSTS_COLLECTION_NAME: string = process.env.VECTOR_DB_POSTS_COLLECTION_NAME || "";
export const VECTOR_DB_URL: string = process.env.VECTOR_DB_URL || "";
export const VECTOR_DB_PASSWORD: string = process.env.VECTOR_DB_PASSWORD || "";

if (!PORT) {
  throw new Error("PORT is not defined in environment variables.");
}

if (!DB_CONNECTION_STRING) {
  throw new Error(
    "DB_CONNECTION_STRING is not defined in environment variables."
  );
}

if (!CLIP_SERVICE_URL) {
  throw new Error("CLIP_SERVICE_URL is not defined in environment variables.");
}

if (!VECTOR_DB_POSTS_COLLECTION_NAME) {
  throw new Error(
    "VECTOR_DB_POST_COLLECTION_NAME is not defined in environment variables."
  );
}

if (!VECTOR_DB_URL) {
  throw new Error(
    "VECTOR_DB_URL is not defined in environment variables."
  );
}

if (!VECTOR_DB_PASSWORD) {
  throw new Error(
    "VECTOR_DB_PASSWORD is not defined in environment variables."
  );
}
