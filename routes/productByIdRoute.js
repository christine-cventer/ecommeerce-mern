import express from "express";
const router = express.Router();
import {
  getProductById,
  returnProduct,
  deleteProductById,
  updateProductById,
  getProductsBySearch,
} from "../controllers/productsByIdControllers.js";
import upload from "../middleware/config/multerConfig.js";

// chain http requests to avoid having to use params in a separate line of code
/*
 * @method - GET
 * @description - List all products by sell/arrival dates
 */
router.get("/product/:productId", getProductById, returnProduct);
router
  .route("/update-product/:productId/")
  .put(updateProductById, upload.single("image"));
router.route("/delete-product/:productId/").delete(deleteProductById);
router.post("/product-search/", getProductsBySearch);

export default router;
