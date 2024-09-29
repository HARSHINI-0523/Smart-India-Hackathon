const express = require('express');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads')); 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderName = req.body.folderName;
        const dir = path.join(__dirname, 'uploads', folderName);

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
    res.send('Welcome to the File Upload API! Use POST /upload to upload files.');
});


app.post('/upload', upload.single('certificate-file'), (req, res) => {
    res.json({ message: 'File uploaded successfully', filePath: `/uploads/${req.body.folderName}/${req.file.filename}` });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
