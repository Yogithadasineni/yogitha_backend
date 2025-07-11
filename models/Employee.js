const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  dept: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
   training: [{ type: String }],
  //  training: { type: String }, // ✅ Store as string like: "React-Java-SQL"

  photo: { type: String },
  link: { type: String }
});

module.exports = mongoose.model('Employee', employeeSchema);
