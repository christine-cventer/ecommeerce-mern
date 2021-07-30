import express from 'express';

const router = express.Router();
import signup from '../controllers/UserController.js';

/*
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post('/signup', signup);

export default router;
