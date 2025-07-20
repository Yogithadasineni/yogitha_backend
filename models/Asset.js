const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  assetid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  purchaseDate: { type: String, required: true },
  photo: { type: String },
  documents: [{ type: String }],
  link: { type: String },
  qrCodeImage: { type: String }, // added QR code image filename
});

module.exports = mongoose.model('Asset', assetSchema);
