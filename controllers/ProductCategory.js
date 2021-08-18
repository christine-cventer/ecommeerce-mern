import ProductCategory from '../models/ProductCategory.js';

export default function createNewCategory(req, res, next) {
    const newCategory = new ProductCategory(req.body);
    newCategory
        .save()
        .then((category) => res.json({ msg: 'New category created', category }))
        .catch((error) => console.log(error));

    next();
}
