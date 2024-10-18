const multer = require('multer');
const path = require('path');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        // Append timestamp and original file extension to the filename
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Initialize upload with file field name
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Only accept certain file types, e.g., images or PDFs
        const fileTypes = /jpeg|jpg|png|gif|pdf/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Error: File upload only supports the following filetypes - ' + fileTypes));
        }
    },
}).single('proof'); // Ensure this matches the field name in the form data

module.exports = upload;
