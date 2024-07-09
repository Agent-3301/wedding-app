const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.static('uploads'));

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit per file
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).array('files', 20); // Allow up to 20 files

// Check file type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|mp4|mov/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images and Videos Only!');
    }
}

// Upload endpoint
app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        console.log('Files:', req.files); // Debugging log
        if (err) {
            res.status(400).send({ message: err });
        } else {
            if (req.files == undefined) {
                res.status(400).send({ message: 'No file selected!' });
            } else {
                res.send(req.files.map(file => file.filename));
            }
        }
    });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
