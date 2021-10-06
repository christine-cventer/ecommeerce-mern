import Product from '../models/Product.js';
import { uploader } from '../middleware/config/cloudinaryConfig.js';
import DatauriParser from 'datauri';
import path from 'path';
import { default as fsWithCallbacks } from 'fs';
const fs = fsWithCallbacks.promises;

const dUriParser = new DatauriParser();

export function dataUri(req, res) {
    if (req.file) {
        const formatMimeType = path.extname(req.file.originalname).toString();
        const buffer = fs.readFileSync(req.file.image.path);
        return dUriParser.format(formatMimeType, buffer);
    }
}

export function CreateNewProduct(req, res, next) {
    if (req.file) {
        const file = dataUri(req).content;
        return uploader
            .upload(file)
            .then((result) => {
                let ProductImage = new Product({
                    name: req.body.name,
                    image: result.url,
                    cloudinary_id: result.public_id,
                    description: req.body.description,
                    price: req.body.price,
                    category: req.body.category,
                });
                ProductImage.save();
                return res.status(200).json({
                    msg: 'Successful upload',
                    data: {
                        image,
                    },
                });
            })
            .catch((err) =>
                res.status(400).json({
                    msg: 'Error uploading image',
                    err,
                })
            );
    }
    next();
}

// export default async function CreateNewProduct(req, res, next) {
//     try {
//         const result = await cloudinaryConfig.uploader.upload(req.file.path);
//         // create an instance of Product with new image
//         let productImage = await new Product({
//             name: req.body.name,
//             image: result.secure_url,
//             cloudinary_id: result.public_id,
//             description: req.body.description,
//             price: req.body.price,
//             category: req.body.category,
//         });
//         await productImage.save();
//         res.json({ productImage });
//     } catch (error) {
//         res.json({
//             msg: 'New product error',
//             error: error,
//         });
//     }
//     next();
// }
