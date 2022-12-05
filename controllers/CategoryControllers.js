import Product from "../models/Product.js";
import ProductCategory from "../models/ProductCategory.js";
import Category from "../models/ProductCategory.js";

export async function getCategoryById(req, res, next) {
  try {
    const category = await Category.findOne({ _id: req.params.categoryId });
    !category
      ? res.send({ msg: "Category does not exist" })
      : res.status(200).send({ msg: "Found category", category });
  } catch (e) {
    next(e);
  }
  next();
}

//TODO - restrict to only allow admin to delete items
export async function deleteCategoryById(req, res, next) {
  try {
    const category = await Category.findByIdAndDelete({
      _id: req.params.categoryId,
    });
    !category
      ? res.send({ msg: "Category not found by that id" })
      : res.status(200).send({ msg: "Category deleted" });
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
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
    next(error);
  }
}

export async function getCategoryByProductId(req, res, next) {
  try {
    let categories = await Product.distinct(
      "ProductCategory",
      {},
      (error, categories) => {
        if (error) {
          res.send({ msg: "Error finding categories with that product id" });
        }
        res.send({ msg: "Found categories" }, { categories });
      }
    );
  } catch (error) {
    next(error);
  }
}

export async function getAllCategories(req, res) {
  try {
    const productCategories = await ProductCategory.find();
    !productCategories
      ? res.send({ msg: "Categories not found" })
      : res.status(200).send({ msg: "Categories", productCategories });
  } catch (error) {
    next(error);
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
