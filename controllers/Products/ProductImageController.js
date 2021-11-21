import Product from '../../models/Product.js';
import cloudinary from '../../middleware/config/cloudinaryConfig.js';

// import upload from '../middleware/config/multerConfig.js';

// console.log(upload);
/**
 *  Upload image to cloudinary, store the path to a variable.
 * Use cloudinary config file and multer config to support upload
 *
 *  Create a new product with default properties
 *
 *  Save new product to db
 */
//  Reads a file synchronously (node-snippets)

export default async function CreateNewProduct(req, res, next) {
    try {
        console.log('Request body files: ', req);
        // console.log('see here :', req.method);
        const imgUpload = await cloudinary.uploader.upload(
            req.files.image.tempFilePath
        );
        // TODO?? ADD image upload validator?
        // TODO - add multer validation for file size
        // this error is caught in the catch block though
        // if (!req.files.file || req.files === null) {
        //     res.send('You must upload a jpeg/jpg file');
        //     console.log('end point hit');
        // }

        // Create new product with image data
        let newProduct = new Product({
            file: imgUpload.secure_url,
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            shipping: req.body.shipping,
            cloudinary_id: imgUpload.public_id,
        });
        await newProduct.save();
        res.json({ msg: 'Product creation success', newProduct });
    } catch (error) {
        console.log('Error uploading image: ', error);
        res.send(error);
    }
    next();
}
