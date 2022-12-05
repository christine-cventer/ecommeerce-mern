import mongoose from "mongoose";

// remove name length validation
// if product is sold, total quantity decreases and productSold increases
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 25,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      ref: "ProductCategory",
      required: true,
    },
    quantity: {
      type: Number,
    },
    productSold: {
      type: Number,
      default: 0,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
    file: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
