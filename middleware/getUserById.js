//allows one to search for a user by their id
import User from '../models/User.js';

export default async function getUserById(req, res, next, id) {
    User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'GetUserById error: user may not have a profile',
            });
        }
        req.profile = user;
        next();
    });
}
