import express from "express";
const router = express.Router();

import {
  getCategoryByProductId,
  deleteCategoryById,
  updateCategory,
  getCategoryByProductId,
  getAllCategories,
} from "../controllers/products/CategoryControllers.js";

router.get("/get-category/:categoryId", getCategoryByProductId);
router.get("/get-all-categories", getAllCategories);
router.get("/get-distinct-categories/", getCategoryByProductId);
router.put("/update-category/:categoryId", updateCategory);
router.delete("/delete-category/:categoryId", deleteCategoryById);

export default router;
