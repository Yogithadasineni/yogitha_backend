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

// // Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
//     cb(null, uniqueName);
//   }
// });

// // File filter
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

// // Upload route: 1 image + multiple documents
// router.post(
//   '/add',
//   upload.fields([
//     { name: 'photo', maxCount: 1 },
//     { name: 'documents', maxCount: 5 }
//   ]),
//   assetController.createAsset
// );

// router.get('/:assetid', assetController.getAssetById);
// router.get('/', assetController.getAllAssets);

// module.exports = router;









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

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  }
});

// File filter for images and documents
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

// Add asset (1 image + multiple documents)
router.post(
  '/add',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
  ]),
  assetController.createAsset
);

// Get asset by ID
router.get('/:assetid', assetController.getAssetById);

// Get all assets
router.get('/', assetController.getAllAssets);

// Update asset (same file structure)
router.put(
  '/asset/:assetid',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
  ]),
  assetController.updateAsset
);

// Delete asset
router.delete('/asset/:assetid', assetController.deleteAsset);

module.exports = router;
