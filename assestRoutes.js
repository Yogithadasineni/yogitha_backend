const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assestController');

const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});
const upload = multer({ storage });

// Routes
router.post(
  '/',
  upload.fields([
    { name: 'pic', maxCount: 1 },
    { name: 'docs', maxCount: 10 }
  ]),
  assetController.createAsset
);

router.get('/:assetid', assetController.getAssetById);
router.get('/', assetController.getAllAssets);

module.exports = router;
