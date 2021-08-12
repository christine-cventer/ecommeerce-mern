//allows for authorization check
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';
dotenv.config();

//must pass req,res to params to trigger middleware functionality
//error next is not a function is thrown when req,res not present
export default function restrictUserAccess(req, res, next) {
    expressJwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'authorization',
        algorithms: ['sha1', 'RS256', 'HS256'],
    });
    next();
}
