import express from 'express';
const router = express.Router();
import {
    ProductById,
    ProductRead,
} from '../controllers/Products/ProductIdController.js';

router.get('/:productId', ProductById, ProductRead);
router.param('productId', ProductById);

export default router;
