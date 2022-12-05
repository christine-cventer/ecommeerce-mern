import { body, validationResult } from "express-validator";
export default function validateUserInput() {
  return (
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().notEmpty().withMessage("Email is required"),
    body("password")
      .notEmpty()
      .isLength({ min: 6 })
      .withMessage("Must use at least 6 characters")
      //Let's ensure that a number is included in password
      .matches(/\d/)
      .withMessage("At least one number"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          msg: "Signup Error",
          errors: errors.array(),
        });
      }
      next();
    }
  );
}
