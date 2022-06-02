export default function isUserAdmin(req, res, next) {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: 'Admin resource, Access denied',
        });
    }
}
