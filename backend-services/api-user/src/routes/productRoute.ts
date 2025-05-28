import express, { Request, Router, Response } from "express";
import { Product } from "@patrik-svensson/models";
import isAuthenticated from "../middleware/isAuthenticated.js";
import admin from "firebase-admin";
import findUser from "../middleware/findUser.js";

interface AuthRequest extends Request {
  user?: admin.auth.DecodedIdToken;
  userDocument?: any;
}

const router: Router = express.Router();

router.get(
  "/",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const startIndex = (page - 1) * limit;

      const products = await Product.find()
        .skip(startIndex)
        .limit(limit)
        .exec();
      const totalProducts = await Product.countDocuments().exec();
      const totalPages = Math.ceil(totalProducts / limit);

      const results = {
        page,
        totalPages,
        hasMore: page < totalPages,
        products,
      };

      res.status(200).json(results);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Error fetching products" });
    }
  }
);

router.get(
  "/:productId",
  isAuthenticated,
  findUser,
  async (req: AuthRequest, res: Response) => {
    const { productId } = req.params;

    try {
      const product = await Product.findById(productId).exec();
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Error fetching product" });
    }
  }
);

export default router;
