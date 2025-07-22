// // const mongoose = require('mongoose');

// // const assetSchema = new mongoose.Schema({
// //   assetid: { type: String, required: true, unique: true },
// //   name: { type: String, required: true },
// //   category: { type: String, required: true },
// //   purchaseDate: { type: String, required: true },
// //   photo: { type: String },
// //   documents: [{ type: String }],
// //   link: { type: String },
// //   qrCodeImage: { type: String }, // added QR code image filename
// // });

// // module.exports = mongoose.model('Asset', assetSchema);










// const mongoose = require('mongoose');

// const assetSchema = new mongoose.Schema({
//   assetid: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   category: { type: String, required: true },
//   purchaseDate: { type: String, required: true },
//   place: { type: String }, // ✅ ADDED this
//   photo: { type: String },
//   documents: [{ type: String }],
//   link: { type: String },
//   qrCodeImage: { type: String },
// });

// module.exports = mongoose.model('Asset', assetSchema);










const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  // assetid: { type: String, required: true},
  assetid: { type: String, required: true, unique: true },

  name: { type: String, required: true },
  category: { type: String, required: true },
  purchaseDate: { type: String, required: true },
  photo: { type: String }, // Single image filename
  documents: [{ type: String }], // Array of document filenames
  link: { type: String },
  qrCodeImage: { type: String }, // QR code filename
});

module.exports = mongoose.model('Asset', assetSchema);
