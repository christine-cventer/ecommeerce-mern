import express from 'express';

const router = express.Router();
import userSignUp from '../controllers/UserController.js';

/*
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post('/signup', userSignUp);

export default router;
