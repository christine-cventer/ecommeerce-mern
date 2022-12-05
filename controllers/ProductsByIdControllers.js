import Product from "../models/Product.js";
import cloudinary from "../middleware/config/cloudinaryConfig.js";

export async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.productId);
    !product ? res.send("no product found with this id") : res.send(product);
  } catch (e) {
    next(e);
  }
}

export function returnProduct(req, res) {
  return res.json(req.product);
}

export async function deleteProductById(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete({
      _id: req.params.productId,
    });
    // console.log("find product", product.cloudinary_id);
    cloudinary.uploader.destroy(product.cloudinary_id, (e) => {
      res.json({
        msg: "Error",
        error: e,
      });
    });
    !product
      ? res.send({ msg: "Product not found by that id" })
      : res.send({ msg: "Product deleted" });
  } catch (error) {
    return next(error);
  }
}
// for now, product update works by deleting original product by id and posting a new product to db
//
export async function updateProductById(req, res, next) {
  try {
    let product = await Product.findById({
      _id: req.params.productId,
    });
    // Update product with req.query not, req.body is null
    // console.log("request body", req.query);

    // still update product even if an image isn't being uploaded
    // to do this, do not add an image field to the body of the request
    if (!req.files || req.files === undefined) {
      (product.name = req.query.name),
        (product.description = req.query.description),
        (product.category = req.query.category),
        (product.shipping = req.query.shipping),
        (product.price = req.query.price),
        (product.quantity = req.query.quantity),
        await product.save();
      res.json({
        msg: "Only product fields updated",
      });
    } else {
      // Upload new file to cloudinary
      //Delete old file in cloudinary
      //Create new product in db
      // Delete old product in db
      cloudinary.uploader
        .destroy(product.cloudinary_id)
        .then((result) => console.log(result));
      const imgUpload = await cloudinary.uploader.upload(
        req.files.image.tempFilePath
      );
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
      res.status(200).send({
        msg: "Full product update successful",
        product: newProduct,
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function getProductsBySearch(req, res) {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = parseInt(req.body.skip); // for loading a certain number of products per page
  let findArgs = {}; // contains category id and price (maintained in state in front end)

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10] etc
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0], // first value of price. e.g the 1 in 10
          $lte: req.body.filters[key][1], // second price value e.g the 0 in 10
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-file")
    .populate("ProductCategory")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((error, data) => {
      if (error) {
        return res.status(404).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
}
