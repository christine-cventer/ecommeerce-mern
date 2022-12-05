import express from "express";

// middleware and controllers
import restrictAuth from "../middleware/restrictUserAccess.js";
import isUserAdmin from "../middleware/userAuthCheck.js";
import isUserAuthorized from "../middleware/isUserAdminCheck.js";
import getUserById from "../middleware/GetUserById.js";
import upload from "../middleware/config/multerConfig.js";
import createNewProduct from "../controllers/NewProductController.js";

const router = express.Router();

// request body would log as undefined when
// upload middleware is hoisted above image upload controller
// this is because the req.body might not have been fully populated yet
//  as It depends on the order that the client transmits fields and files to the server.
// the file was being sent before the controller property fields, and thus there is no way for multer to know about classId when it's handling the file.
// the solution was to rearrange the order that the route was accessing the middleware

// Also noticed that in order to test the image upload route,
// you need to start a new HTTP request in Postman and not use a version that was saved

router.post(
  "/create-product/:userId",
  createNewProduct,
  upload.single("image"),
  isUserAuthorized,
  isUserAdmin,
  restrictAuth,
  (req, res) => {
    if (!req.file) {
      throw Error("File missing");
    } else {
      res.send("success");
    }
  }
);
router.param("userId", getUserById);

export default router;
