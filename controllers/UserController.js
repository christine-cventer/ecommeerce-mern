import User from '../models/User.js';

export default async function userSignUp(req, res) {
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
