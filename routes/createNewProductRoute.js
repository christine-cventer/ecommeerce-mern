import express from 'express';

// middleware and controllers
import restrictAuth from '../middleware/restrictUserAccess.js';
import isUserAdmin from '../middleware/userAuthCheck.js';
import isUserAuthorized from '../middleware/adminRoleCheck.js';
import getUserById from '../middleware/getUserById.js';
import upload from '../middleware/config/multerConfig.js';
import CreateNewProduct from '../controllers/ProductImageController.js';
import { createImageUpload } from '../middleware/config/signedUpload.js';

const router = express.Router();

// request body would log as undefined when
// upload middleware was before image upload middleware
// this is because the req.body might not have been fully populated yet
//  as It depends on the order that the client transmits fields and files to the server.
// the file was being sent before the controller property fields, and thus there is no way for multer to know about classId when it's handling the file.
// the solution was to rearrange the order that the route was accessing the middleware
// 11 - 11 - 21
// Also noticed that in order to test the image upload route,
//     you need to start a new HTTP request in Postman

router.post(
    '/new-product/create/:userId',
    CreateNewProduct,
    createImageUpload,
    upload.single('file'),
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
