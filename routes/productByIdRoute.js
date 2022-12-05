import express from "express";
const router = express.Router();
import {
  getProductById,
  returnProduct,
  deleteProductById,
  updateProductById,
  getProductsBySearch,
} from "../controllers/products/ProductsByIdControllers.js";
import upload from "../middleware/config/multerConfig.js";

// chain http requests to avoid having to use params in a separate line of code
router.get("/get-product/:productId", getProductById, returnProduct);
router.route("/update/:productId/").put(updateProductById, upload.single("image"));
router.route("/delete/:productId/").delete(deleteProductById);
router.post("/get-product/search", getProductsBySearch);

export default router;
