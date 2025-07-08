// // const express = require('express');
// // const router = express.Router();
// // const cors = require('cors');
// // const multer = require('multer');
// // const path = require('path');
// // const assetController = require('../controllers/assestController'); // <-- FIXED spelling

// // // CORS middleware (allow all origins for development)
// // router.use(cors());

// // // Multer storage config
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, '../uploads'));
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + '-' + file.originalname);
// //   }
// // });
// // const upload = multer({ storage });

// // // Route for creating a new asset
// // router.post(
// //   '/add',
// //   upload.fields([
// //     { name: 'pic', maxCount: 1 },
// //     { name: 'docs', maxCount: 10 }
// //   ]),
// //   assetController.createAsset
// // );

// // // Route for updating an asset
// //   router.post(
// //     '/add',
// //     upload.fields([
// //       { name: 'pic', maxCount: 1 },
// //     ]),
// //     assetController.createAsset
// //   );

// // // Route for getting all assets
// // router.get('/', assetController.getAllAssets); // <-- FIXED: removed extra /assets

// // // Route for getting asset by ID
// // router.get('/:assetid', assetController.getAssetById); // <-- FIXED: removed extra /assets

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const assetController = require('../controllers/assestController'); // Make sure the spelling matches your file!

// // CORS middleware (allow all origins for development)
// router.use(cors());

// // Multer storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
//     cb(null, uniqueName);
//   }
// });

// // Optional: File filter for images only (like employee route)
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimeType = allowedTypes.test(file.mimetype);
//   if (extName && mimeType) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only .jpeg, .jpg, .png image files are allowed!'));
//   }
// };

// const upload = multer({ storage, fileFilter });

// // Route for creating a new asset (single image upload, no docs)
// router.post('/add', upload.single('pic'), assetController.createAsset);

// // Route for getting all assets
// router.get('/', assetController.getAllAssets);

// // Route for getting asset by ID
// router.get('/:assetid', assetController.getAssetById);

// module.exports = router;

const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assestController');
const multer = require('multer');
const path = require('path');

// Ensure the uploads folder exists
const fs = require('fs');
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config for single image upload (like employee)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
                  allowedTypes.test(file.mimetype);
  cb(null, isValid);
};

const upload = multer({ storage, fileFilter });

// Routes
router.post('/add', upload.single('photo'), assetController.createAsset);
router.get('/:assetid', assetController.getAssetById);
router.get('/', assetController.getAllAssets);

module.exports = router;
