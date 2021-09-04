import express from 'express';
import restrictAuth from '../middleware/restrictUserAccess.js';
import isUserAdmin from '../middleware/userAuthCheck.js';
import isUserAuthorized from '../middleware/adminRoleCheck.js';
import createNewProductCategory from '../controllers/ProductCategoryController.js';
import getUserById from '../middleware/getUserById.js';

const router = express.Router();

//only admin can create new categories
router.post(
    '/create/:userId',
    createNewProductCategory,
    isUserAuthorized,
    isUserAdmin,
    restrictAuth,
    (req, res) => {
        res.send('Success');
    }
);
router.param('userId', getUserById);
export default router;
