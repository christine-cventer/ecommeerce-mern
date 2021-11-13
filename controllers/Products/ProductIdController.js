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
