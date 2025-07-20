// const Asset = require('../models/Asset');


// // const Asset = require('../models/asset.model');
// const QRCode = require('qrcode');
// const fs = require('fs');
// const path = require('path');

// exports.createAsset = async (req, res) => {
//   try {
//     const { assetid, name, category, purchaseDate } = req.body;

//     // Create asset link
//     const link = `asset://${assetid}`;

//     // Generate QR code image
//     const qrImagePath = path.join(__dirname, '..', 'uploads', `${assetid}_qrcode.png`);
//     await QRCode.toFile(qrImagePath, link);

//     // Get uploaded files
//     const photo = req.files?.photo?.[0]?.filename || null;
//     const documents = req.files?.documents?.map(file => file.filename) || [];

//     // Save asset
//     const asset = new Asset({
//       assetid,
//       name,
//       category,
//       purchaseDate,
//       photo,
//       documents,
//       link, // original asset://... link
//       qrcode: `${assetid}_qrcode.png` // optional: to return QR code image filename
//     });

//     await asset.save();
//     res.status(201).json({ message: 'Asset created successfully', asset });
//   } catch (error) {
//     console.error('Error creating asset:', error);
//     res.status(500).json({ error: 'Failed to create asset' });
//   }
// };

// exports.getAssetById = async (req, res) => {
//   try {
//     const asset = await Asset.findOne({ assetid: req.params.assetid });

//     if (!asset) return res.status(404).json({ error: 'Asset not found' });

//     res.status(200).json(asset);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch asset' });
//   }
// };

// exports.getAllAssets = async (req, res) => {
//   try {
//     const assets = await Asset.find();
//     res.status(200).json(assets);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch assets' });
//   }
// };
















const Asset = require('../models/Asset');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '..', 'uploads');

exports.createAsset = async (req, res) => {
  try {
    const { assetid, name, category, purchaseDate } = req.body;

    const link = `asset://${assetid}`;
    const qrImagePath = path.join(uploadDir, `${assetid}_qrcode.png`);
    await QRCode.toFile(qrImagePath, link);

    const photo = req.files?.photo?.[0]?.filename || null;
    const documents = req.files?.documents?.map(file => file.filename) || [];

    const asset = new Asset({
      assetid,
      name,
      category,
      purchaseDate,
      photo,
      documents,
      link,
      qrCodeImage: `${assetid}_qrcode.png`
    });

    await asset.save();
    res.status(201).json({ message: 'Asset created successfully', asset });
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ error: 'Failed to create asset' });
  }
};

exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findOne({ assetid: req.params.assetid });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.status(200).json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch asset' });
  }
};

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};

exports.updateAsset = async (req, res) => {
  try {
    const { assetid } = req.params;
    const { name, category, purchaseDate } = req.body;

    const asset = await Asset.findOne({ assetid });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    if (name) asset.name = name;
    if (category) asset.category = category;
    if (purchaseDate) asset.purchaseDate = purchaseDate;

    if (req.files?.photo?.[0]) {
      if (asset.photo) fs.unlinkSync(path.join(uploadDir, asset.photo));
      asset.photo = req.files.photo[0].filename;
    }

    if (req.files?.documents?.length > 0) {
      asset.documents.forEach(doc => {
        const docPath = path.join(uploadDir, doc);
        if (fs.existsSync(docPath)) fs.unlinkSync(docPath);
      });
      asset.documents = req.files.documents.map(file => file.filename);
    }

    await asset.save();
    res.status(200).json({ message: 'Asset updated successfully', asset });
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({ error: 'Failed to update asset' });
  }
};

exports.deleteAsset = async (req, res) => {
  try {
    const { assetid } = req.params;

    const asset = await Asset.findOneAndDelete({ assetid });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    if (asset.photo) {
      const photoPath = path.join(uploadDir, asset.photo);
      if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
    }

    if (asset.documents?.length > 0) {
      asset.documents.forEach(doc => {
        const docPath = path.join(uploadDir, doc);
        if (fs.existsSync(docPath)) fs.unlinkSync(docPath);
      });
    }

    if (asset.qrCodeImage) {
      const qrPath = path.join(uploadDir, asset.qrCodeImage);
      if (fs.existsSync(qrPath)) fs.unlinkSync(qrPath);
    }

    res.status(200).json({ message: 'Asset deleted successfully' });
  } catch (error) {
    console.error('Error deleting asset:', error);
    res.status(500).json({ error: 'Failed to delete asset' });
  }
};
