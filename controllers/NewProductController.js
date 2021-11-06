import Product from '../models/Product.js';
import cloudinary from '../middleware/config/cloudinaryConfig.js';

// import upload from '../middleware/config/multerConfig.js';

// console.log(upload);
/**
 *  Upload file to cloudinary, store the path to a variable.
 * Use cloudinary config file and multer config to support upload
 *
 *  Create a new product with default properties
 *
 *  Save new product to db
 */
//  Reads a file synchronously (node-snippets)

export default async function CreateNewProduct(req, res, next) {
    try {
        // console.log('Request body files: ', req.files);
        // console.log('see here :', req.body);
        const imgUpload = await cloudinary.uploader.upload(
            req.files.file.tempFilePath
        );

        // Create new product with image data
        let newProduct = new Product({
            name: req.files.file.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            quantity: req.body.quantity,
            shipping: req.body.shipping,
            cloudinary_id: imgUpload.public_id,
            file: imgUpload.secure_url,
        });
        await newProduct.save();
        res.json(newProduct);
    } catch (error) {
        console.log('Error uploading image: ', error);
        res.send(error);
    }
    next();
}
