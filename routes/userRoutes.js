import express from "express";
import validateUserInput from "../middleware/validateUserInput.js";
const router = express.Router();
import {
  userSignUp,
  userSignIn,
  userSignOut,
  getUserById,
  UpdateUserAccount,
  UserAccountDelete,
} from "../controllers/authorizedUserController.js";

import restrictAuth from "../middleware/restrictUserAccess.js";

/*
 * @method - POST
 * @description - User SignUp
 */
router.post("/signup", validateUserInput(), userSignUp);
/*
 * @method - POST
 * @description - User SignIn
 */
router.post("/signin", userSignIn);
/*
 * @method - GET
 * @description - User SignOut
 */
router.get("/signout", userSignOut);
/*
 * @method - GET
 * @param - /userId
 * @description - test route for middleware
 */
router.get("/secret/:userId", restrictAuth, (req, res) => {
  res.send({
    msg: "Authorized",
    user: req.profile,
  });
});
/*
 * @method - PUT
 * @description - Update user account
 */
router.put("/user-account-update/:userId", UpdateUserAccount);
/*
 * @method - PUT
 * @description - Delete user account
 */
router.delete("/user-account-delete/:userId", UserAccountDelete);
router.param("userId", getUserById);

export default router;
