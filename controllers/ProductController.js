import multer from 'multer';
import { fs } from 'fs';
import path from 'path/posix';
import Product from '../models/Product';

export default function CreateNewProduct(req, res, next) {
    const imageObj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(
                path.join(__dirname + '/uploads/' + req.file.filename)
            ),
            contentType: 'image/png',
        },
    };
    next();
    Product.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            item.save();
            res.redirect('/');
        }
    });
    next();
}
