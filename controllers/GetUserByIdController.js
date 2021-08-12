//allows one to search for a user where id is a key
import User from '../models/User.js';

export default async function getUserById(req, res, next, id) {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found',
            });
        }
        req.profile = user;
        next();
    });
}
