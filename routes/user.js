import express from 'express';

const router = express.Router();
import postSayHi from '../controllers/UserController.js';

/*
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.get('/', postSayHi);

export default router;
