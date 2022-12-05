import express from "express";
import {
  listProducts,
  findRelatedProducts,
} from "../controllers/ProductsSoldController.js";
const router = express.Router();

/*
 * @method - GET
 * @description - List all products by sell/arrival dates
 */
router.get("/get-products-sold", listProducts);
/*
 * @method - GET
 * @description - find products related by category
 */
router.get("/get-products-related/:productCategoryId", findRelatedProducts);

export default router;
