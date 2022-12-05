import express from "express";
import restrictAuth from "../middleware/restrictUserAccess.js";
import isUserAdmin from "../middleware/userAuthCheck.js";
import isUserAuthorized from "../middleware/isUserAdminCheck.js";
import createNewCategory from "../controllers/CategoryControllers.js";
import getUserById from "../middleware/GetUserById.js";

const router = express.Router();

//only admin can create new categories

router.post(
  "/create-profile/:userId",
  createNewCategory,
  isUserAuthorized,
  isUserAdmin,
  restrictAuth,
  (req, res) => {
    res.send("Success");
  }
);
router.param("userId", getUserById);
export default router;
