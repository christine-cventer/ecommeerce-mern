import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function userSignUp(req, res, next) {
  try {
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail) {
      res.json({
        msg: "A user with this information already exists",
      });
    } else {
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      return res.status(200).send({
        msg: "Your account has been created",
        user: newUser,
      });
    }
  } catch (error) {
    next(error);
  }
}
//TODO- convert function to use async/await
export function userSignIn(req, res) {
  // 1 find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).send({
        errror: "Account does not exist",
      });
    }
    // 2 if user found, proceed to authenticate
    // TODO create authenticate method in User model
    if (!user.authenticate(password)) {
      return res.status(401).send({
        error: "Email and password do not match",
      });
    }
    //generate a signed token with user id and secret key.
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token, t, in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 999 });
    //return response with user and token to front end client
    const { _id, email, name, role } = user;
    return res.send({ token, user: { _id, email, name, role } });
  });
}

export function userSignOut(req, res) {
  //to sign out, simple clear the cookie (which stores user token) from response
  res.clearCookie("t");
  res.send({ message: "Sign out" });
}

export async function getUserById(req, res, next, id) {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
}
export async function UpdateUserAccount(req, res, next) {
  try {
    let user = await User.findOne({
      _id: req.params.userId,
    });

    // Ensure that updated email (if any), does not match an email address already stored in the db
    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail && user._id != req.params.userId) {
      res.send("Other user exists with this updated email");
    }

    if (user._id == req.params.userId) {
      // form fields would have at least one character so I cannot check if the string length is 0 or empty
      if (req.body.email <= 1 && req.body.name <= 1) {
        res.send("Form fields cannot be left empty");
      } else {
        const { name, email, password } = req.body;
        const { id } = req.params.userId;
        const filter = { id };

        const updatedUser = await User.findOneAndUpdate(filter, req.body, {
          new: true,
        });
        return res.status(200).send({
          message: "Update successful",
          data: updatedUser,
        });
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

// for users to delete their own accounts
export async function UserAccountDelete(req, res, next) {
  try {
    const user = await User.findByIdAndDelete({
      _id: req.params.userId,
    });
    if (!user) {
      throw Error("User not found");
    }
    // users will be logged out after deleting their own accounts
    // admin is role 0 and users are role 1
    req.profile.role === 1
      ? res.clearCookie("t")
      : res.json({ message: "Account deleted" });
  } catch (error) {
    next(error);
  }
}
