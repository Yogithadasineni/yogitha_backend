const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empid: { type: String, required: true, unique: true },
  name: String,
  dept: String,
  phone: String,
  address: String,
  training: [String],
  photo: String, // stores photo filename
  qrCodeImage: String, // stores QR code image filename
  link: String, // optional: QR content
});

module.exports = mongoose.model('Employee', employeeSchema);
