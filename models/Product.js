import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        cloudinary_id: {
            type: String,
        },
        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 25,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
        category: {
            type: ObjectId,
            ref: 'Category',
            maxlength: 15,
            required: true,
        },
        quantity: {
            type: Number,
        },
        image: {
            data: Buffer,
            contentType: String,
        },
        shipping: {
            required: false,
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Product', ProductSchema);
