import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./middleware/config/connectDb.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import productCategoryRoute from "./routes/createProductCategoryRoute.js";
import productRoutes from "./routes/createNewProductRoute.js";
import productById from "./routes/productByIdRoute.js";
import categoryById from "./routes/categoryByIdRoute.js";
import productsSold from "./routes/productsSoldRoute.js";
import fileUpload from "express-fileupload";

const router = express.Router();
connectDb();

dotenv.config();

const app = express();

const PORT = process.env.PORT;

//facilitates image uploads
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes middleware
app.use("/api/v1/user", userRoute);
app.use("/api/v1/category", productCategoryRoute);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/get-product-by-id/", productById);
app.use("/api/v1/get-category-by-id/", categoryById);
app.use("/api/v1/get-products-sold", productsSold);

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
