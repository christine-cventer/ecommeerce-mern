
//allows for authorization check
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';
dotenv.config();

export function restrictAuth(req, res, next) {
    expressJwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'authorization',
        algorithms: ['sha1', 'RS256', 'HS256'],
    });
    if (!req.user) return res.sendStatus(401);
    res.sendStatus(200);
    next();
}


