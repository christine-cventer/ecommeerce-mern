import Category from "../../models/ProductCategory.js";

export async function CategoryById(req, res, next) {
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

export async function CategoryDelete(req, res) {
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

export async function CategoryUpdate(req, res) {
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
    msg: "Category update error", error;
  }
}
