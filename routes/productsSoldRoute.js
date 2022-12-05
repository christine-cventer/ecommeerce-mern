import express from "express";
import {
  listProducts,
  findRelatedProducts,
} from "../controllers/products/ProductsSoldController.js";
const router = express.Router();

//sell/arrival
router.get("/get-products-sold", listProducts);
router.get("/get-products-related/:productCategoryId", findRelatedProducts);

export default router;
