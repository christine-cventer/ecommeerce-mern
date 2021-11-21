import express from "express";
const router = express.Router();
import {
  ProductById,
  ProductRead,
  ProductDelete,
  ProductUpdate,
} from "../controllers/Products/ProductIdController.js";

// chain http requests to avoid having to use params in a separate line of code
router.get("/get-product/:productId", ProductById, ProductRead);
router.route("/get-product/:productId").get(ProductById, ProductRead);
router.route("/update/:productId/").put(ProductUpdate);
// TODO - only admins can delete products, add admin auth middleware?
// users should be able to delete from cart aw well. would revist after getting to front end
router.route("/delete/:productId/").delete(ProductDelete);

export default router;
