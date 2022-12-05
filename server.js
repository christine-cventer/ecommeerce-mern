import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import productCategoryRoute from "./routes/createProductCategoryRoute.js";
import productRoutes from "./routes/createNewProductRoute.js";
import productById from "./routes/productByIdRoute.js";
import categoryById from "./routes/categoryByIdRoute.js";
import productsSold from "./routes/productsSoldRoute.js";
import fileUpload from "express-fileupload";
import cors from "cors";

function createServer() {
  const app = express()
    .use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
      })
    )
    .use(cors())
    .use(morgan("dev"))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .use(
      "/",
      new express.Router().get("/", (req, res) => {
        res.status(200).send("Your app is running, go catch it!");
      })
    )
    .use("/api/v1/user", userRoute)
    .use("/api/v1/category", productCategoryRoute)
    .use("/api/v1/product", productRoutes)
    .use("/api/v1/get-product-by-id/", productById)
    .use("/api/v1/get-category-by-id/", categoryById)
    .use("/api/v1/get-products-sold", productsSold);

  return app;
}

export default createServer;
