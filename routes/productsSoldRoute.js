import express from "express";
import ProductList from "../controllers/Products/ProductsSoldController.js";
const router = express.Router();

//sell/arrival
router.get("/get-products-sold", ProductList);

export default router;
