import express from "express";
import firebaseAdmin from "firebase-admin";
import postRoute from "./routes/postRoute.js";
import userRoutes from "./routes/userRoute.js";
import styleboardRoutes from "./routes/styleboardRoute.js";
import productRoutes from "./routes/productRoute.js";
import cors from "cors";
import morgan from "morgan";
import { ServiceAccount } from "firebase-admin";
import mongoose from "mongoose";
import { PORT, DB_CONNECTION_STRING } from "./config/index.js";

async function initializeFirebase() {
  const serviceAccount = await import("./firebase-credentials.json", {
    assert: { type: "json" },
  });
  const serviceAccountTyped = serviceAccount.default as ServiceAccount;

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccountTyped),
    storageBucket: "fashion-inspiration-app.appspot.com",
  });
}

async function connectToMongoDB() {
  await mongoose.connect(DB_CONNECTION_STRING);
}

const app = express();

async function startServer(): Promise<void> {
  try {
    await initializeFirebase();
    await connectToMongoDB();

    app.use(express.json());

    app.use(cors({
      origin: '*', 
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }));

    app.options('*', cors());

    app.use(morgan("dev"));

    app.use("/api/v1/posts", postRoute);
    app.use("/api/v1/users", userRoutes);
    app.use("/api/v1/styleboards", styleboardRoutes);
    app.use("/api/v1/products", productRoutes);

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error("MongoDB connection error:", err.message);
    process.exit(-1);
  }
}

startServer();
