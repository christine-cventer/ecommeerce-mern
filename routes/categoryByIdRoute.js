import express from "express";
const router = express.Router();

import {
  CategoryById,
  CategoryDelete,
  CategoryUpdate,
} from "../controllers/Products/CategoryControllers.js";

router.get("/get-category/:categoryId", CategoryById);
router.put("/update-category:categoryId", CategoryUpdate);
router.delete("/delete-category/:categoryId", CategoryDelete);

export default router;
