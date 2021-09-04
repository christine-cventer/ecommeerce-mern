import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoutes.js';
import productCategoryRoute from './routes/createProductCategoryRoute.js';
import productRoutes from './routes/createNewProductRoute.js';

const router = express.Router();
connectDb();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

//middleware
app.use(morgan('dev'));
app.use(express.json());
//app.use(expressValidator()); <--- legacy syntax
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes middleware
app.use('/api/v1/user', userRoute);
app.use('/api/v1/category', productCategoryRoute);
app.use('/api/v1/product/', productRoutes);

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
