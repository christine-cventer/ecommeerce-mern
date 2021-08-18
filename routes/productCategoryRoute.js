import express from 'express';
import restrictAuth from '../middleware/restrictUserAccess.js';
import isUserAdmin from '../middleware/userAuthCheck.js';
import isUserAuthorized from '../middleware/adminRoleCheck.js';
import createNewCategory from '../controllers/ProductCategory.js';
import getUserById from '../controllers/GetUserByIdController.js';

const router = express.Router();

//only admin can create new categories
router.post(
    '/create/:userId',
    createNewCategory,
    isUserAuthorized,
    isUserAdmin,
    restrictAuth,
    (req, res) => {
        res.send('Success');
    }
);
router.param('userId', getUserById);
export default router;
