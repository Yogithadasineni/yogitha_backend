const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assestController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  }
});

// File filter
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const allowedImage = ['.jpg', '.jpeg', '.png'];
    const allowedDocs = ['.pdf', '.doc', '.docx'];

    if (allowedImage.includes(ext) || allowedDocs.includes(ext)) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
});

// Upload route: 1 image + multiple documents
router.post(
  '/add',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
  ]),
  assetController.createAsset
);

router.get('/:assetid', assetController.getAssetById);
router.get('/', assetController.getAllAssets);

module.exports = router;


























// const express = require('express');
// const router = express.Router();
// const assetController = require('../controllers/assestController');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure uploads folder exists
// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Multer storage configuration (save with original file names)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // Save using original file name (e.g., camera.pdf)
//   }
// });

// // File filter for accepted file types
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     const allowedImage = ['.jpg', '.jpeg', '.png'];
//     const allowedDocs = ['.pdf', '.doc', '.docx'];

//     if (allowedImage.includes(ext) || allowedDocs.includes(ext)) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//     }
//   }
// });

// // Route: Upload asset (1 image + multiple documents)
// router.post(
//   '/add',
//   upload.fields([
//     { name: 'photo', maxCount: 1 },
//     { name: 'documents', maxCount: 5 }
//   ]),
//   assetController.createAsset
// );

// // Other asset routes
// router.get('/:assetid', assetController.getAssetById);
// router.get('/', assetController.getAllAssets);

// module.exports = router;
