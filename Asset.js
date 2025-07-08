const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  assetid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  purchaseDate: { type: String, required: true },
  place: { type: String },
  pic: { type: String },            // e.g. /uploads/xxx.png
  docs: [{ type: String }],         // e.g. ["/uploads/xxx.pdf"]
  link: { type: String }
});

module.exports = mongoose.model('Asset', assetSchema);
