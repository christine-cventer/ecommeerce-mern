import e from 'express';
import Product from '../../models/Product.js';

export async function ProductById(req, res, next) {
    try {
        const product = await Product.findOne({ _id: req.params.productId });
        // console.log('Found product: ', product);
        return res.json({ msg: 'Found product', product });
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

export async function ProductDelete(req, res) {
    try {
        const product = await Product.findByIdAndDelete({
            _id: req.params.productId,
        });
        !product
            ? res.json({ msg: 'Product not found by that id' })
            : res.json({ msg: 'Product deleted' });
    } catch (error) {
        return res.json({
            msg: 'Unable to delete',
            error: error.Message,
        });
    }
}
