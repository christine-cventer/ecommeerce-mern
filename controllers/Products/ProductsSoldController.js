import Product from "../../models/Product.js";
// return products to frontend client

/**
 * sell/arrival
 * retun by sell =/products?sortBy=sold&order=desc&limit=4
 * retun by arrival =/products?sortBy=createdAt&order=desc&limit=4
 * all products are returned if no params are sent
 */

// export default function ProductList(req, res, next) {
//   // try {
//   console.log(req);
//   let order = req.query.order ? req.query.order : "asc";
//   let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
//   let limit = req.query.limit ? req.query.limit : 6;
//   // TODO - make another req to fetch product photo
//   const products = Product.find();
//   // .select("-file")
//   // .populate("ProductCategory")
//   // .sort([[sortBy, order]])
//   // .limit(limit)
//   // .exec();

//   return res.json({ msg: "data", products });
//   // } catch (error) {
//   //   return res.json({
//   //     msg: "Error fetching product(s)",
//   //     error: error.toString(),
//   //   });
//   // }
//   next();
// }
export default async function ProductList(req, res) {
  try {
    const products = await Product.find().populate("ProductCategory");
    return res.json({ msg: "Found products", products });
  } catch (err) {
    return res.json({
      msg: err.Message,
    });
  }
}
