import express from "express";
const router = express.Router();

import {
  getCategoryByProductId,
  deleteCategoryById,
  updateCategory,
  getAllCategories,
} from "../controllers/CategoryControllers.js";

router.get("/category/:categoryId", getCategoryByProductId);
router.get("/categories", getAllCategories);
router.get("/categories-distinct/", getCategoryByProductId);
router.put("/category-update/:categoryId", updateCategory);
router.delete("/category-delete/:categoryId", deleteCategoryById);

export default router;
