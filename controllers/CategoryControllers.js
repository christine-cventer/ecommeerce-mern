import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";
import Category from "../models/ProductCategory.js";

export async function getCategoryById(req, res, next) {
  try {
    const category = await Category.findOne({ _id: req.params.categoryId });
    !category
      ? res.json({ msg: "Category does not exist" })
      : res.json({ msg: "Found category", category });
  } catch (e) {
    return res.json({
      msg: e.Message,
    });
  }
  next();
}

//TODO - restrict to only allow admin to delete items
export async function deleteCategoryById(req, res) {
  try {
    const category = await Category.findByIdAndDelete({
      _id: req.params.categoryId,
    });
    !category
      ? res.json({ msg: "Category not found by that id" })
      : res.json({ msg: "Category deleted" });
  } catch (error) {
    return res.json({
      msg: "Unable to delete",
      error: error.toString(),
    });
  }
}

export async function updateCategory(req, res) {
  try {
    let product = await Product.findById({
      _id: req.params.productId,
    });
    product.category = req.query.category;
    await category.save();
    res.json({
      msg: "Category updated, be sure to update products associated with this category",
    });
  } catch (error) {
    return res.json({
      msg: "Error updating category",
      error: error.toString(),
    });
  }
}

export async function getCategoryByProductId(req, res) {
  try {
    let categories = await Product.distinct(
      "ProductCategory",
      {},
      (error, categories) => {
        if (error) {
          res.json({ msg: "Error finding categories with that product id" });
        }
        return res.json({ msg: "Found categories" }, { categories });
      }
    );
  } catch (error) {}
}

export async function getAllCategories(req, res) {
  try {
    const productCategories = await ProductCategory.find();
    !productCategories
      ? res.json({ msg: "Categories not found" })
      : res.status(200).json({ msg: "Categories", productCategories });
  } catch (error) {
    return res.json({
      msg: "Unable to get categories",
      error: error.toString(),
    });
  }
}

export default function createNewCategory(req, res, next) {
  const newCategory = new ProductCategory(req.body);
  newCategory
    .save()
    .then((category) => res.json({ msg: "New category created", category }))
    .catch((error) => console.log(error));

  next();
}
