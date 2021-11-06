import express, { json } from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDb.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoutes.js';
import productCategoryRoute from './routes/createProductCategoryRoute.js';
import productRoutes from './routes/createNewProductRoute.js';
import fileUpload from 'express-fileupload';

const router = express.Router();
connectDb();

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

//middleware
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);
app.use(morgan('dev'));
app.use(express.json());
//app.use(expressValidator()); <--- legacy syntax
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes middleware
app.use('/api/v1/user', userRoute);
app.use('/api/v1/category', productCategoryRoute);
app.use('/api/v1/product/', productRoutes);

// //Express Error Handling
// app.use(function (err, req, res, next) {
//     if (err instanceof multer.MulterError) {
//         res.statusCode = 400;
//         res.send(err.code);
//     } else if (err) {
//         if (err.message === 'FILE_MISSING') {
//             res.statusCode = 400;
//             res.send('FILE_MISSING');
//         } else {
//             res.statusCode = 500;
//             res.send('GENERIC_ERROR');
//         }
//     }
// });

app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
