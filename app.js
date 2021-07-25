import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
console.log('Changed');
console.log('Changed');
//db connection
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

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(PORT, () => console.log(`Listening on port:${PORT}`));
