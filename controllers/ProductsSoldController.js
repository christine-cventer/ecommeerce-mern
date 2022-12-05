import Product from "../models/Product.js";

/**
 * sell/arrival
 * retun by sell : /get-products-sold?sortBy=sold&order=desc&limit=4
 * retun by arrival : /get-products-sold?sortBy=createdAt&order=desc&limit=4
 * all products are returned if no params are sent
 */

export async function listProducts(req, res) {
  try {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 4;
    const products = await Product.find()
      .populate("ProductCategory")
      .sort([[sortBy, order]])
      .limit(limit)
      .exec();
    !products
      ? res.json("No products found")
      : res.json({ msg: "Found products", products });
  } catch (err) {
    return res.json({
      msg: err.Message,
    });
  }
}

/**
 * find products based on req product category
 * @param {*} req
 * @param {*} res
 */

//TODO - filter related product that is being returned in the product response
export async function findRelatedProducts(req, res) {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 2;
    // return all products except the one in the request
    const relatedProducts = await Product.find({
      category: req.params.productCategoryId,
    })
      .limit(limit)
      .populate("ProductCategory", "name", "_id");
    console.log(`Found ${relatedProducts.length} products`);
    !relatedProducts
      ? res.json({ msg: "Products not found by that id" })
      : res.json({ msg: "Related products" }, { relatedProducts });
  } catch (err) {
    return res.json({
      msg: err.Message,
    });
  }
}
