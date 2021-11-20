import express from 'express';
const router = express.Router();
import {
    ProductById,
    ProductRead,
    ProductDelete,
    ProductUpdate,
} from '../controllers/Products/ProductIdController.js';
import { getUserById } from '../controllers/UserAuthController.js';
import isUserAdmin from '../middleware/userAuthCheck.js';
import isUserAuthorized from '../middleware/adminRoleCheck.js';
import restrictAuth from '../middleware/restrictUserAccess.js';

router.get('/get-product/:productId', ProductById, ProductRead);
router.route('/get-product/:productId').get(ProductById, ProductRead);
router.route('/update/:userId/:productId/').put(ProductUpdate);
router.route('/delete/:productId/').delete(ProductDelete);

export default router;
