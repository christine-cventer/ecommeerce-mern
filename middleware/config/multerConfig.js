import multer from 'multer';

// Declare what type of storage to use, can also be diskStorage (which comes with options)
const storage = multer.memoryStorage();
//Determine what type of files are supported
const fileFilter = (req, res, cb) => {
    if (fileFilter.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported filetype' }, false);
    }
};
// This is the function that gets passed to your controller to manage uploads
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
