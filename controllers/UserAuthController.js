import User from '../models/User.js';

//generates signed token
import jwt from 'jsonwebtoken';

export async function userSignUp(req, res) {
    const userEmail = await User.findOne({ name: req.body.email });
    if (userEmail) {
        res.json({ msg: 'A user with this information already exists' });
    } else {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        return res.json({
            msg: 'Your account has been created',
            user: newUser,
        });
    }
}
//TODO- convert function to use async/await
export function userSignIn(req, res) {
    // 1 find user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                errror: 'Account does not exist',
            });
        }
        // 2 if user found, proceed to authenticate
        // TODO create authenticate method in User model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password do not match',
            });
        }
        //generate a signed token with user id and secret key.
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        //persist the token, t, in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 999 });
        //return response with user and token to front end client
        const { _id, email, name, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
}

export function userSignOut(req, res) {
    //to sign out, simple clear the cookie (which stores user token) from response
    res.clearCookie('t');
    res.json({ message: 'Sign out' });
}
export async function employerSignUp(req, res) {
    const email = await Employer.findOne({ email: req.body.email });
    if (email) {
        res.json({
            msg: 'An accountt with this email already exists, please proceed to login',
        });
    } else {
        const newEmployer = await Employer.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        return res.json({
            msg: 'Your account has been created',
            user: newEmployer,
        });
    }
}
