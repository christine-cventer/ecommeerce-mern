import express from 'express';

// middleware and controllers
import restrictAuth from '../middleware/restrictUserAccess.js';
import isUserAdmin from '../middleware/userAuthCheck.js';
import isUserAuthorized from '../middleware/adminRoleCheck.js';
import getUserById from '../middleware/getUserById.js';
import upload from '../middleware/config/multerConfig.js';
import CreateNewProduct from '../controllers/NewProductController.js';
import { createImageUpload } from '../middleware/config/signedUpload.js';

const router = express.Router();

router.post(
    '/new-product/create/:userId',
    upload.single('file'),
    CreateNewProduct,
    createImageUpload,
    isUserAuthorized,
    isUserAdmin,
    restrictAuth,
    (req, res) => {
        if (!req.file) {
            throw Error('File missing');
        } else {
            res.send('success');
        }
    }
);
router.param('userId', getUserById);

export default router;
