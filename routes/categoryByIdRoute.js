import express from "express";
const router = express.Router();

import {
  CategoryById,
  CategoryDelete,
  CategoryUpdate,
  getCategoryByProductId,
  getAllCategories,
} from "../controllers/products/CategoryControllers.js";

router.get("/get-category/:categoryId", CategoryById);
router.get("/get-all-categories", getAllCategories);
router.get("/get-distinct-categories/", getCategoryByProductId);
router.put("/update-category/:categoryId", CategoryUpdate);
router.delete("/delete-category/:categoryId", CategoryDelete);

export default router;
