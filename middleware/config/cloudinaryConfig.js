import { config, uploader } from 'cloudinary';
// import pkg from 'cloudinary';
// const { cloudinary } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const cloudinaryConfig = () => {
    config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    next();
};

export { cloudinaryConfig, uploader };
