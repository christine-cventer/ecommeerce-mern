import multer from 'multer';
import DatauriParser from 'datauri';
import path from 'path';
// import { readFileSync } from 'fs';
import { default as fsWithCallbacks } from 'fs';
const fs = fsWithCallbacks.promises;
const dUriParser = new DatauriParser();

const storage = multer.memoryStorage();
export function multerUploads() {
    multer({ storage }).single('image');
}
const formatMimeType = (req) => path.extname(req.file.originalname).toString();
const buffer = fs.readFileSync(req.file.image.path);
// TODO: convert buffer data from image to url (see Product model in models/)
// * @param {Object} req containing the field object
// * @returns {String} The data url from the string buffer

export function dataUri(req) {
    dUriParser.format(formatMimeType, buffer);
}
