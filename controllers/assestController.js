// const Asset = require('../models/Asset');

// // Create new asset
// exports.createAsset = async (req, res) => {
//   console.log('Received asset creation request', req.body, req.file); // <-- Log req.file, not req.files
//   try {
//     const { assetid, name, category, purchaseDate } = req.body;

//     const exists = await Asset.findOne({ assetid });
//     if (exists) return res.status(400).json({ error: 'Asset ID already exists' });

//     // Handle uploaded image (get relative path)
//     const pic = req.file ? `/uploads/${req.file.filename}` : null;

//     // Construct QR-compatible link with relative paths only (not full URL)
//     const link = `asset://assetid=${encodeURIComponent(assetid)}`
//                + `&name=${encodeURIComponent(name)}`
//                + `&category=${encodeURIComponent(category)}`
//                + `&purchaseDate=${encodeURIComponent(purchaseDate)}`
//                + `&pic=${encodeURIComponent(pic || '')}`;

//     const asset = new Asset({
//       assetid,
//       name,
//       category,
//       purchaseDate,
//       pic,
//       link
//     });

//     await asset.save();

//     res.status(201).json({ message: 'Asset created', data: asset, link });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error', details: error.message });
//   }
// };

// // Get asset by ID
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

// // Get all assets
// exports.getAllAssets = async (req, res) => {
//   try {
//     const assets = await Asset.find({});
//     res.json(assets);
//   } catch (error) {
//     res.status(500).json({ error: 'Server error', details: error.message });
//   }
// };


















const Asset = require('../models/Asset');

exports.createAsset = async (req, res) => {
  try {
    const { assetid, name, category, purchaseDate } = req.body;

    const exists = await Asset.findOne({ assetid });
    if (exists) return res.status(400).json({ error: 'Asset ID already exists' });

    // Extract photo (single)
    const photo = req.files['photo']?.[0]
      ? `/uploads/${req.files['photo'][0].filename}`
      : null;

    // Extract documents (multiple)
    const documents = req.files['documents']
      ? req.files['documents'].map((file) => `/uploads/${file.filename}`)
      : [];

    // const link = `asset://assetid=${encodeURIComponent(assetid)}`
    //            + `&name=${encodeURIComponent(name)}`
    //            + `&category=${encodeURIComponent(category)}`
    //            + `&purchaseDate=${encodeURIComponent(purchaseDate)}`
    //            + `&photo=${encodeURIComponent(photo || '')}`;

    // Convert documents array to a single string (comma-separated)
const documentsParam = documents.map(encodeURIComponent).join(',');

// Build full link with documents
const link = `asset://assetid=${encodeURIComponent(assetid)}`
           + `&name=${encodeURIComponent(name)}`
           + `&category=${encodeURIComponent(category)}`
           + `&purchaseDate=${encodeURIComponent(purchaseDate)}`
           + `&photo=${encodeURIComponent(photo || '')}`
           + `&documents=${documentsParam}`;


    const asset = new Asset({
      assetid,
      name,
      category,
      purchaseDate,
      photo,
      documents,
      link
    });

    await asset.save();
    res.status(201).json({ message: 'Asset created', data: asset, link });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

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

exports.getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find({});
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
