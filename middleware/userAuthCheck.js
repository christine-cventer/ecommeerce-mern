/**
 * 
 *Function used to check if user has proper authorization to perform certain actions
 */
export default function isUserAuthorized(req, res, next) {
    let user = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied',
        });
    }
    next();
}
