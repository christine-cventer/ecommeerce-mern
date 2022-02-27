import mongoose from "mongoose";
const { Schema } = mongoose;

const ProductCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      // unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductCategory", ProductCategorySchema);
