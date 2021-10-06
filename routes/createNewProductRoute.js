import express from 'express';
// middleware and controllers

import restrictAuth from '../middleware/restrictUserAccess.js';
import isUserAdmin from '../middleware/userAuthCheck.js';
import isUserAuthorized from '../middleware/adminRoleCheck.js';
import getUserById from '../middleware/getUserById.js';
import { CreateNewProduct } from '../controllers/NewProductController.js';
import { multerUploads } from '../middleware/config/multerConfig.js';

const router = express.Router();
router.post(
    '/new-product/create/:userId',
    CreateNewProduct,
    isUserAuthorized,
    isUserAdmin,
    restrictAuth,
    multerUploads,
    (req, res) => {
        console.log('Image file route: ', req.body);
        res.send('Success');
    }
);
router.param('userId', getUserById);

/**
 Successful test route 

 router.post(
    '/new-product/create/',
    multerUploads,

    (req, res) => {
        console.log('Image file route', 'req.file: ', req.file);
        res.send('Success');
    }
);
 */
export default router;
