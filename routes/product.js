import express from 'express';
import restrictAuth from '../middleware/restrictUserAccess.js';
import isUserAdmin from '../middleware/userAuthCheck.js';
import isUserAuthorized from '../middleware/adminRoleCheck.js';
import createNewCategory from '../controllers/ProductCategory.js';
import getUserById from '../middleware/getUserById.js';
import ProductCategory from '../models/ProductCategory.js';

import multer from 'multer';
const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now());
    },
});
const upload = multer({ storage: storage });
// var type = upload.single('recfile');
//only admin can create new categories
router.post(
    '/new/create/:userId',
    upload.single('image'),
    ProductCategory,
    isUserAuthorized,
    isUserAdmin,
    restrictAuth,
    (req, res, next) => {
        upload(req, res, function (err) {
            if (err) {
                res.json({ msg: 'Unable to upload image file' });
            }
            next();
            return;
        });
    }
);
router.param('userId', getUserById);
export default router;
