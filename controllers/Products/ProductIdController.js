import Product from "../../models/Product.js";
import cloudinary from "../../middleware/config/cloudinaryConfig.js";

export async function ProductById(req, res, next) {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    !product
      ? res.json({ msg: "Product does not exist" })
      : res.json({ msg: "Found product", product });
  } catch (e) {
    return res.json({
      msg: e.Message,
    });
  }
  next();
}

export function ProductRead(req, res) {
  return res.json(req.product);
}

export async function ProductDelete(req, res) {
  try {
    const product = await Product.findByIdAndDelete({
      _id: req.params.productId,
    });
    console.log("find product", product.cloudinary_id);
    cloudinary.uploader.destroy(product.cloudinary_id, (e) => {
      res.json({
        msg: "Error",
        error: e,
      });
    });
    !product
      ? res.json({ msg: "Product not found by that id" })
      : res.json({ msg: "Product deleted" });
  } catch (error) {
    return res.json({
      msg: "Unable to delete",
      error: error.toString(),
    });
  }
}

// TODO - build product update controller
// get product by id
// allow user to upload a new image with the same category

// TODO - build a route for updating product information
// build another route for updating the photo
// use findOneAndUpdate
export async function ProductUpdate(req, res, next) {
  try {
    // body of request is stored in req.query object and not req.body
    let product = await Product.findById({
      _id: req.params.productId,
    });
    (product.name = req.query.name),
      (product.description = req.query.description),
      (product.category = req.query.category),
      (product.shipping = req.query.shipping),
      (product.price = req.query.price),
      (product.quantity = req.query.quantity),
      await product.save();
    res.json({
      msg: "update successful",
      product: product,
    });
  } catch (error) {
    return res.json({
      msg: "Error updating product",
      error: error.toString(),
    });
  }
  next();
}

