import express from 'express';
const router = express.Router();
import {
    ProductById,
    ProductRead,
    ProductDelete,
} from '../controllers/Products/ProductIdController.js';
import { getUserById } from '../controllers/UserAuthController.js';
import isUserAdmin from '../middleware/userAuthCheck.js';
import isUserAuthorized from '../middleware/adminRoleCheck.js';
import restrictAuth from '../middleware/restrictUserAccess.js';

router.get('/:productId', ProductById, ProductRead);
router.delete(
    '/delete/:productId',
    ProductDelete,
    isUserAuthorized,
    isUserAdmin,
    restrictAuth
);
router.param('productId', ProductDelete);
router.param('userId', getUserById);

export default router;
