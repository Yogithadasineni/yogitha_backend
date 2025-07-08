// const Asset = require('../models/Asset');

// exports.createAsset = async (req, res) => {
//   try {
//     const { assetid, name, category, purchaseDate } = req.body;

//     const exists = await Asset.findOne({ assetid });
//     if (exists) return res.status(400).json({ error: 'Asset ID already exists' });

//     const pic = req.files['pic'] ? `/uploads/${req.files['pic'][0].filename}` : null;
//     const docs = req.files['docs'] ? req.files['docs'].map(f => `/uploads/${f.filename}`) : [];

//     const serverUrl = 'http://192.168.97.113:5000';
//     const picUrl = pic ? `${serverUrl}${pic}` : '';
//     const docsUrls = docs.map(doc => `${serverUrl}${doc}`).join(',');

//     const link = `asset://assetid=${encodeURIComponent(assetid)}`
//                + `&name=${encodeURIComponent(name)}`
//                + `&category=${encodeURIComponent(category)}`
//                + `&purchaseDate=${encodeURIComponent(purchaseDate)}`
//                + `&pic=${encodeURIComponent(picUrl)}`
//                + `&docs=${encodeURIComponent(docsUrls)}`;

//     const asset = new Asset({
//       assetid,
//       name,
//       category,
//       purchaseDate,
//       pic,
//       docs,
//       link
//     });

//     await asset.save();

//     res.status(201).json({ message: 'Asset created', data: asset, link });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error', details: error.message });
//   }
// };

// exports.getAssetById = async (req, res) => {
//   try {
//     const { assetid } = req.params;
//     const asset = await Asset.findOne({ assetid });
//     if (!asset) return res.status(404).json({ error: 'Asset not found' });
//     res.json(asset);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error', details: error.message });
//   }
// };

// exports.getAllAssets = async (req, res) => {
//   try {
//     const assets = await Asset.find({});
//     res.json(assets);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error', details: error.message });
//   }
// };









const Asset = require('../models/Asset');

// Create new asset
exports.createAsset = async (req, res) => {
  try {
    const { assetid, name, category, purchaseDate } = req.body;

    const exists = await Asset.findOne({ assetid });
    if (exists) return res.status(400).json({ error: 'Asset ID already exists' });

    // Handle uploaded files (get relative paths)
    const pic = req.files['pic'] ? `/uploads/${req.files['pic'][0].filename}` : null;
    const docs = req.files['docs'] ? req.files['docs'].map(f => `/uploads/${f.filename}`) : [];

    // Construct QR-compatible link with relative paths only (not full URL)
    const link = `asset://assetid=${encodeURIComponent(assetid)}`
               + `&name=${encodeURIComponent(name)}`
               + `&category=${encodeURIComponent(category)}`
               + `&purchaseDate=${encodeURIComponent(purchaseDate)}`
               + `&pic=${encodeURIComponent(pic || '')}`
               + `&docs=${encodeURIComponent(docs.join(','))}`;

    const asset = new Asset({
      assetid,
      name,
      category,
      purchaseDate,
      pic,
      docs,
      link
    });

    await asset.save();

    res.status(201).json({ message: 'Asset created', data: asset, link });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get asset by ID
exports.getAssetById = async (req, res) => {
  try {
    const { assetid } = req.params;
    const asset = await Asset.findOne({ assetid });

    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    res.json(asset);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find({});
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
