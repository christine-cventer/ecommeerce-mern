import cloudinary from 'cloudinary';
// import { cloudinary as cloudinaryConfig } from './cloudinaryConfig';
import dotenv from 'dotenv';
dotenv.config();
const cloudinaryAPISecret = process.env.CLOUDINARY_API_SECRET;
/**
 * REST API calls with cloudinary require a signed signature
 * See cloudinary docs for more
 */

// Server-side function used to sign an upload with a couple of
// example eager transformations included in the request.

export async function createImageUpload() {
    const timestamp = new Date().getTime();
    const signature = await cloudinary.utils.api_sign_request(
        {
            timestamp,
        },
        cloudinaryAPISecret
    );
    return { timestamp, signature };
}

// const secureImageUpload = () => {
//     const timestamp = Math.round(new Date().getTime() / 1000);

//     const signature = cloudinary.utils.api_sign_request(
//         {
//             timestamp: timestamp,
//             eager: 'c_pad,h_300,w_400|c_crop,h_200,w_260',
//             folder: 'signed_upload_demo_form',
//         },
//         apiSecret
//     );

//     return { timestamp, signature };
// };

// module.exports = {
//     signuploadform,
// };
