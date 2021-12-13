import Product from "../../models/Product.js";
// return products to frontend client

/**
 * sell/arrival
 * retun by sell =/productSold?sortBy=sold&order=desc&limit=4
 * retun by arrival =/productSold?sortBy=createdAt&order=desc&limit=4
 * all products are returned if no params are sent
 */

export default async function ProductList(req, res) {
  try {
    let order = req.query.order ? req.query.order : "asc";
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;
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
