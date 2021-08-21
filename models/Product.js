import mongoose, { ObjectId } from 'mongoose';
const { ObjectId } = mongoose.Schema;

uuidv4();

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
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
