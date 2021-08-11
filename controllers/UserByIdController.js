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
/* exports.getUserById = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.json({
        msg: "Found user",
        user,
      });
    } catch (err) {
      return res.json({
        msg: err.Message,
      });
    }
  }; 
  
      User.findById(id).exec((error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'User not found',
            });
        }
        req.profile = user;
        console.log('Hello');
        next();
    });

    try {
        const user = await User.findOne({
            userId: req.user && req.user._id,
        });
        if (user) {
            res.json({
                msg: 'Found user',
                user,
            });
        }
    } catch (err) {
        res.json({ error: err.message || err.toString() });
    }
    next();
    return;
} */
