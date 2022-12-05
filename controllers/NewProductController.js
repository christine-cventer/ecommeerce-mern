import Product from "../models/Product.js";
import cloudinary from "../middleware/config/cloudinaryConfig.js";

/**
 *  To upload image to cloudinary:
 *   -store the cloudinary path to a variable.
 *   -use cloudinary config file and multer config to support upload
 *   -create a new product with default properties
 *   -save product to db
 *
 *
 */

export default async function createNewProduct(req, res, next) {
  try {
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
    // see where the path to the image is stored in cloudinary_id
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
    res.send({ msg: "Product creation success", newProduct });
  } catch (error) {
    next(error);
  }
}
