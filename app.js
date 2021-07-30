import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import router from './routes/user.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//db connection
console.log('Changed');
console.log('Changed');
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`);
});
//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser);

//routes middleware
app.use('/api/v1/user', router);
app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
