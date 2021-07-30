import User from '../models/User.js';

export default function userSignUp(req, res) {
    console.log('req.body: ', req.body);
    const user = new User(req.body);
    //upon save, an error or succeess will be generated
    //how does one handle each?
    user.save((error, success) => {
        if (error) {
            return res.status(400).json({ error });
        }
        res.json({
            success,
        });
    });
}

/*export default async function userSignUp(req, res) {
    console.log('request body: ', req.body);
    try {
        const user = await User.findOne({ name: req.body.name });
        console.log(req.body.name);
        if (user) {
            res.json({ msg: 'A user with this information already exists' });
        } else {
            console.log('User created');
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
    } catch (error) {
        console.log(error);
        res.json({
            msg: error.Message,
        });
    }
} */
