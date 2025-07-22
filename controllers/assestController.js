// const Asset = require('../models/Asset');
// const { v4: uuidv4 } = require('uuid');
// const path = require('path');
// const QRCode = require('qrcode');
// const fs = require('fs');

// exports.createAsset = async (req, res) => {
//   try {
//     const { assetid: inputId, name, category, purchaseDate, link } = req.body;
//     const assetid = inputId || uuidv4(); // Use given or generate UUID

//     const photo = req.files?.photo?.[0]?.filename || '';
//     const documents = req.files?.documents?.map(doc => doc.filename) || [];

//     // Save asset first (without QR code image)
//     const asset = new Asset({
//       assetid,
//       name,
//       category,
//       purchaseDate,
//       photo,
//       documents,
//       link,
//       qrCodeImage: '' // to be updated after QR generation
//     });

//     await asset.save();

//     // Generate QR with correct content
//     const qrContent = `asset://${assetid}`;
//     const qrFileName = `${assetid}-qrcode.png`;
//     const qrFolder = path.join(__dirname, '..', 'uploads', 'qrcodes');

//     // Ensure qr folder exists
//     if (!fs.existsSync(qrFolder)) fs.mkdirSync(qrFolder, { recursive: true });

//     const qrPath = path.join(qrFolder, qrFileName);
//     await QRCode.toFile(qrPath, qrContent);

//     // Update asset with QR code path
//     asset.qrCodeImage = `qrcodes/${qrFileName}`;
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
//     res.json(asset);
//   } catch (err) {
//     console.error('Error fetching asset:', err);
//     res.status(500).json({ error: 'Failed to fetch asset' });
//   }
// };

// exports.getAllAssets = async (req, res) => {
//   try {
//     const assets = await Asset.find();
//     res.json(assets);
//   } catch (err) {
//     console.error('Error fetching all assets:', err);
//     res.status(500).json({ error: 'Failed to fetch assets' });
//   }
// };

// exports.updateAsset = async (req, res) => {
//   try {
//     const { name, category, purchaseDate, link } = req.body;

//     const updates = {
//       name,
//       category,
//       purchaseDate,
//       link
//     };

//     if (req.files?.photo?.[0]) {
//       updates.photo = req.files.photo[0].filename;
//     }

//     if (req.files?.documents) {
//       updates.documents = req.files.documents.map(doc => doc.filename);
//     }

//     const asset = await Asset.findOneAndUpdate(
//       { assetid: req.params.assetid },
//       updates,
//       { new: true }
//     );

//     if (!asset) return res.status(404).json({ error: 'Asset not found' });

//     res.json({ message: 'Asset updated', asset });
//   } catch (error) {
//     console.error('Update error:', error);
//     res.status(500).json({ error: 'Failed to update asset' });
//   }
// };

// exports.deleteAsset = async (req, res) => {
//   try {
//     const asset = await Asset.findOneAndDelete({ assetid: req.params.assetid });
//     if (!asset) return res.status(404).json({ error: 'Asset not found' });

//     // Optionally delete associated files
//     if (asset.qrCodeImage) {
//       const qrPath = path.join(__dirname, '..', 'uploads', asset.qrCodeImage);
//       if (fs.existsSync(qrPath)) fs.unlinkSync(qrPath);
//     }

//     if (asset.photo) {
//       const photoPath = path.join(__dirname, '..', 'uploads', 'photos', asset.photo);
//       if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
//     }

//     if (asset.documents?.length > 0) {
//       asset.documents.forEach(doc => {
//         const docPath = path.join(__dirname, '..', 'uploads', 'documents', doc);
//         if (fs.existsSync(docPath)) fs.unlinkSync(docPath);
//       });
//     }

//     res.json({ message: 'Asset deleted successfully' });
//   } catch (error) {
//     console.error('Delete error:', error);
//     res.status(500).json({ error: 'Failed to delete asset' });
//   }
// };
















const Asset = require('../models/Asset');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const QRCode = require('qrcode');
const fs = require('fs');

// ✅ Create Asset with QR data
exports.createAsset = async (req, res) => {
  try {
    const { assetid: inputId, name, category, purchaseDate, link } = req.body;
    const assetid = inputId || uuidv4();

    const photo = req.files?.photo?.[0]?.filename || '';
    const documents = req.files?.documents?.map(doc => doc.filename) || [];

    const existing = await Asset.findOne({ assetid });
    if (existing) {
      return res.status(400).json({ error: 'Asset ID already exists' });
    }

    const qrData = `asset://assetid=${assetid}&name=${encodeURIComponent(name)}&category=${encodeURIComponent(category)}&purchaseDate=${purchaseDate}&link=${encodeURIComponent(link)}&photo=${photo}`;

    const qrFileName = `${assetid}-qrcode.png`;
    const qrFolder = path.join(__dirname, '..', 'uploads', 'qrcodes');
    const qrPath = path.join(qrFolder, qrFileName);

    if (!fs.existsSync(qrFolder)) fs.mkdirSync(qrFolder, { recursive: true });

    await QRCode.toFile(qrPath, qrData, {
      width: 300,
      margin: 2,
    });

    const asset = new Asset({
      assetid,
      name,
      category,
      purchaseDate,
      photo,
      documents,
      link,
      qrCodeImage: `qrcodes/${qrFileName}`,
    });

    await asset.save();
    res.status(201).json({ message: 'Asset created successfully', asset });
  } catch (error) {
    console.error('Error creating asset:', error);
    res.status(500).json({ error: 'Failed to create asset' });
  }
};

// ✅ Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch assets' });
  }
};

// ✅ Get single asset by assetid
exports.getAssetById = async (req, res) => {
  try {
    const asset = await Asset.findOne({ assetid: req.params.assetid });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch asset' });
  }
};

// ✅ Update asset by assetid
exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findOne({ assetid: req.params.assetid });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    const { name, category, purchaseDate, link } = req.body;

    if (name) asset.name = name;
    if (category) asset.category = category;
    if (purchaseDate) asset.purchaseDate = purchaseDate;
    if (link) asset.link = link;

    if (req.files?.photo?.[0]) {
      asset.photo = req.files.photo[0].filename;
    }

    if (req.files?.documents) {
      asset.documents = req.files.documents.map(doc => doc.filename);
    }

    const qrData = `asset://assetid=${asset.assetid}&name=${encodeURIComponent(asset.name)}&category=${encodeURIComponent(asset.category)}&purchaseDate=${asset.purchaseDate}&link=${encodeURIComponent(asset.link)}&photo=${asset.photo}`;
    const qrFileName = `${asset.assetid}-qrcode.png`;
    const qrFolder = path.join(__dirname, '..', 'uploads', 'qrcodes');
    const qrPath = path.join(qrFolder, qrFileName);

    if (!fs.existsSync(qrFolder)) fs.mkdirSync(qrFolder, { recursive: true });

    await QRCode.toFile(qrPath, qrData, {
      width: 300,
      margin: 2,
    });

    asset.qrCodeImage = `qrcodes/${qrFileName}`;
    await asset.save();

    res.json({ message: 'Asset updated successfully', asset });
  } catch (error) {
    console.error('Error updating asset:', error);
    res.status(500).json({ error: 'Failed to update asset' });
  }
};

// ✅ Delete asset by assetid
exports.deleteAsset = async (req, res) => {
  try {
    const asset = await Asset.findOneAndDelete({ assetid: req.params.assetid });
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json({ message: 'Asset deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete asset' });
  }
};
