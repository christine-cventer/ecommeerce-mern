import Product from '../../models/Product.js';
import User from '../../models/User.js';
import cloudinary from '../../middleware/config/cloudinaryConfig.js';

export async function ProductById(req, res, next) {
    try {
        const product = await Product.findOne({ _id: req.params.productId });
        // console.log('Found product: ', product)
        !product
            ? res.json({ msg: 'Product does not exist' })
            : res.json({ msg: 'Found product', product });
    } catch (e) {
        return res.json({
            msg: e.Message,
        });
    }
    next();
}

export function ProductRead(req, res) {
    return res.json(req.product);
}
// TODO - incorporate cloudinary deletion functionality into product delete route
// delete product from cloudinary first
// use cloudinary public id to be able to access product in cloudinary and remove
export async function ProductDelete(req, res) {
    try {
        // console.log('params', req);
        const product = await Product.findByIdAndDelete({
            _id: req.params.productId,
        });
        console.log('find product', product.cloudinary_id);
        cloudinary.uploader.destroy(product.cloudinary_id, (e) => {
            res.json({
                msg: 'Error',
                error: e,
            });
        });
        !product
            ? res.json({ msg: 'Product not found by that id' })
            : res.json({ msg: 'Product deleted' });
    } catch (error) {
        return res.json({
            msg: 'Unable to delete',
            error: error.toString(),
        });
    }
}

// TODO - build product update controller
// get product by id
// delete product from db and cloudinary
// allow user to upload a new image with the same category

// TODO - build a route for updating product information
// build another route for updating the photo
// use findOneAndUpdate
export async function ProductUpdate(req, res, next) {
    try {
        // console.log('Request body files: ', req);
        // let product = await Product.findOne(product._id);
        // console.log('product: ', product);
        // //let imgUpload = await cloudinary.uploader.upload(
        // let user = await User.findOne(user._id);
        // console.log('user', user);
        //     req.files.file.tempFilePath
        // );
        // TODO?? ADD image upload validator?
        // TODO - add multer validation for file size
        // this error is caught in the catch block though
        // if (!req.files.file || req.files === null) {
        //     res.send('You must upload a jpeg/jpg file');
        //     console.log('end point hit');
        // }
        // Create new product with image data
        // let editedProduct = req;
        // await editedProduct.save();
        // res.json({ msg: 'Product creation success', editedProduct });
    } catch (error) {
        console.log('Error finding image: ', error);
        res.send(error);
    }
    next();
}

// try {
//     //
//     const post = await Post.findOne({
//       _id: req.params.postid,
//       user: req.user,
//     });
//     if (post) {
//       post.post = req.body.post || post.post;
//       post.save();
//       //TO SHOW THAT A POST HAS BEEN EDITED
//       //COMPARE POST.CREQATED AT AND POST.UPDATED AT AND IF THEY ARE DIFFERENT, SHOW "EDITED" BUTTON
//       return res.json({
//         msg: "Post updated",
//         post,
//       });
//     }
//   } catch (error) {}
// };
