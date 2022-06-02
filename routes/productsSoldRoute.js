import express from "express";
import {
  ProductList,
  ProductRelated,
} from "../controllers/products/ProductsSoldController.js";
const router = express.Router();

//sell/arrival
router.get("/get-products-sold", ProductList);
router.get("/get-products-related/:productCategoryId", ProductRelated);

export default router;
