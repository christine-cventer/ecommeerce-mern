import User from '../models/User.js';

export default function signUp(req, res) {
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
