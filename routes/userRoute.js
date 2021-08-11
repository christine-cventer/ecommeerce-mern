import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();
import {
    userSignUp,
    userSignIn,
    userSignOut,
} from '../controllers/UserAuthController.js';

import getUserById from '../controllers/UserByIdController.js';
import restrictAuth from '../middleware/restrictAuthorization.js';

/*
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
    '/signup',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().notEmpty().withMessage('Email is required'),
    body('password')
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage('Must use at least 6 characters')
        //Let's ensure that a number is included in password
        .matches(/\d/)
        .withMessage('At least one number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: 'Signup Error',
                errors: errors.array(),
            });
        }
        next();
    },
    userSignUp
);
/*
 * @method - POST
 * @param - /signin
 * @description - User SignIn
 */
router.post('/signin', userSignIn);
/*
 * @method - GET
 * @param - /signout
 * @description - User SignOut
 */
router.get('/signout', userSignOut);

router.get('/secret/:userId', (req, res) => {
    res.json({
        msg: 'Authorized',
        user: req.profile,
    });
});

router.param('userId', getUserById);

export default router;
