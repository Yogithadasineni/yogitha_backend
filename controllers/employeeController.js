// // const Employee = require('../models/Employee');
// // const QRCode = require('qrcode');
// // const fs = require('fs');
// // const path = require('path');

// // exports.createEmployee = async (req, res) => {
// //   try {
// //     const { empid, name, dept, phone, address } = req.body;
// //     let training = req.body.training || [];

// //     if (typeof training === 'string') {
// //       try {
// //         training = JSON.parse(training);
// //       } catch {
// //         training = [training];
// //       }
// //     }

// //     const photo = req.file ? req.file.filename : '';
// //     const trainingStr = training.join('-');

// //     const existing = await Employee.findOne({ empid });
// //     if (existing) {
// //       return res.status(400).json({ error: 'Employee ID already exists' });
// //     }

// //     const link = `emp://empid=${empid}&name=${encodeURIComponent(name)}&dept=${dept}&phone=${phone}&address=${encodeURIComponent(address)}&training=${encodeURIComponent(trainingStr)}&photo=${photo}`;

// //     const qrImageFilename = `qrcode-${empid}.png`;
// //     const qrImagePath = path.join(__dirname, '..', 'uploads', qrImageFilename);
// //     await QRCode.toFile(qrImagePath, link);

// //     const employee = new Employee({
// //       empid,
// //       name,
// //       dept,
// //       phone,
// //       address,
// //       training,
// //       photo,
// //       link,
// //       qrCodeImage: qrImageFilename,
// //     });

// //     await employee.save();
// //     res.status(201).json({ message: 'Employee created', data: employee });
// //   } catch (err) {
// //     res.status(500).json({ error: 'Server error', details: err.message });
// //   }
// // };

// // exports.getAllEmployees = async (req, res) => {
// //   try {
// //     const employees = await Employee.find();
// //     res.json(employees);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Server error', details: err.message });
// //   }
// // };

// // exports.getEmployee = async (req, res) => {
// //   try {
// //     const empid = req.params.empid;
// //     const employee = await Employee.findOne({ empid });
// //     if (!employee) {
// //       return res.status(404).json({ message: 'Employee not found' });
// //     }
// //     res.json(employee);
// //   } catch (error) {
// //     res.status(500).json({ message: 'Server Error', error });
// //   }
// // };







// const Employee = require('../models/Employee');
// const QRCode = require('qrcode');
// const fs = require('fs');
// const path = require('path');

// exports.createEmployee = async (req, res) => {
//   try {
//     const { empid, name, dept, phone, address } = req.body;
//     let training = req.body.training || [];

//     if (typeof training === 'string') {
//       try {
//         training = JSON.parse(training);
//       } catch {
//         training = [training];
//       }
//     }

//     const photo = req.file ? req.file.filename : '';
//     const trainingStr = training.join('-');

//     const existing = await Employee.findOne({ empid });
//     if (existing) {
//       return res.status(400).json({ error: 'Employee ID already exists' });
//     }

//     const link = `emp://empid=${empid}&name=${encodeURIComponent(name)}&dept=${dept}&phone=${phone}&address=${encodeURIComponent(address)}&training=${encodeURIComponent(trainingStr)}&photo=${photo}`;
//     const qrImageFilename = `qrcode-${empid}.png`;
//     const qrImagePath = path.join(__dirname, '..', 'uploads', qrImageFilename);
//     await QRCode.toFile(qrImagePath, link);

//     const employee = new Employee({
//       empid,
//       name,
//       dept,
//       phone,
//       address,
//       training,
//       photo,
//       link,
//       qrCodeImage: qrImageFilename,
//     });

//     await employee.save();
//     res.status(201).json({ message: 'Employee created', data: employee });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// };

// exports.getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// };

// exports.getEmployee = async (req, res) => {
//   try {
//     const empid = req.params.empid;
//     const employee = await Employee.findOne({ empid });
//     if (!employee) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }
//     res.json(employee);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error', error });
//   }
// };

// exports.editEmployee = async (req, res) => {
//   try {
//     const empid = req.params.empid;
//     let { name, dept, phone, address, training } = req.body;

//     if (typeof training === 'string') {
//       try {
//         training = JSON.parse(training);
//       } catch {
//         training = [training];
//       }
//     }

//     const existing = await Employee.findOne({ empid });
//     if (!existing) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     const photo = req.file ? req.file.filename : existing.photo;
//     const trainingStr = training.join('-');
//     const link = `emp://empid=${empid}&name=${encodeURIComponent(name)}&dept=${dept}&phone=${phone}&address=${encodeURIComponent(address)}&training=${encodeURIComponent(trainingStr)}&photo=${photo}`;
//     const qrImageFilename = `qrcode-${empid}.png`;
//     const qrImagePath = path.join(__dirname, '..', 'uploads', qrImageFilename);
//     await QRCode.toFile(qrImagePath, link);

//     const updated = await Employee.findOneAndUpdate(
//       { empid },
//       {
//         name,
//         dept,
//         phone,
//         address,
//         training,
//         photo,
//         link,
//         qrCodeImage: qrImageFilename,
//       },
//       { new: true }
//     );

//     res.json({ message: 'Employee updated', data: updated });
//   } catch (error) {
//     res.status(500).json({ message: 'Update failed', error: error.message });
//   }
// };

// exports.deleteEmployee = async (req, res) => {
//   try {
//     const empid = req.params.empid;
//     const deleted = await Employee.findOneAndDelete({ empid });

//     if (!deleted) {
//       return res.status(404).json({ message: 'Employee not found' });
//     }

//     // Remove files (QR and photo) if needed
//     const uploadsDir = path.join(__dirname, '..', 'uploads');
//     if (deleted.photo) {
//       fs.unlink(path.join(uploadsDir, deleted.photo), () => {});
//     }
//     if (deleted.qrCodeImage) {
//       fs.unlink(path.join(uploadsDir, deleted.qrCodeImage), () => {});
//     }

//     res.json({ message: 'Employee deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Delete failed', error: err.message });
//   }
// };









const Employee = require('../models/Employee');
const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

// Utility to safely parse training field
const parseTraining = (input) => {
  if (!input) return [];
  if (Array.isArray(input)) return input;
  try {
    return JSON.parse(input);
  } catch {
    return [input];
  }
};

// ✅ Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const { empid, name, dept, phone, address } = req.body;
    let training = parseTraining(req.body.training);

    const photo = req.file ? req.file.filename : '';
    const trainingStr = training.join('-');

    const existing = await Employee.findOne({ empid });
    if (existing) {
      return res.status(400).json({ error: 'Employee ID already exists' });
    }

    const link = `emp://empid=${empid}&name=${encodeURIComponent(name)}&dept=${dept}&phone=${phone}&address=${encodeURIComponent(address)}&training=${encodeURIComponent(trainingStr)}&photo=${photo}`;
    const qrImageFilename = `qrcode-${empid}.png`;
    const qrImagePath = path.join(__dirname, '..', 'uploads', qrImageFilename);
    await QRCode.toFile(qrImagePath, link);

    const employee = new Employee({
      empid,
      name,
      dept,
      phone,
      address,
      training,
      photo,
      link,
      qrCodeImage: qrImageFilename,
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created', data: employee });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// ✅ Get All Employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

// ✅ Get Single Employee
exports.getEmployee = async (req, res) => {
  try {
    const empid = req.params.empid;
    const employee = await Employee.findOne({ empid });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// ✅ Edit Employee
exports.editEmployee = async (req, res) => {
  try {
    const empid = req.params.empid;
    const { name, dept, phone, address } = req.body;
    let training = parseTraining(req.body.training);

    const existing = await Employee.findOne({ empid });
    if (!existing) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const photo = req.file ? req.file.filename : existing.photo;
    const trainingStr = training.join('-');

    const link = `emp://empid=${empid}&name=${encodeURIComponent(name)}&dept=${dept}&phone=${phone}&address=${encodeURIComponent(address)}&training=${encodeURIComponent(trainingStr)}&photo=${photo}`;
    const qrImageFilename = `qrcode-${empid}.png`;
    const qrImagePath = path.join(__dirname, '..', 'uploads', qrImageFilename);
    await QRCode.toFile(qrImagePath, link);

    const updated = await Employee.findOneAndUpdate(
      { empid },
      {
        name,
        dept,
        phone,
        address,
        training,
        photo,
        link,
        qrCodeImage: qrImageFilename,
      },
      { new: true }
    );

    res.json({ message: 'Employee updated', data: updated });
  } catch (error) {
    res.status(500).json({ message: 'Update failed', error: error.message });
  }
};

// ✅ Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const empid = req.params.empid;
    const deleted = await Employee.findOneAndDelete({ empid });

    if (!deleted) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (deleted.photo) {
      fs.unlink(path.join(uploadsDir, deleted.photo), () => {});
    }
    if (deleted.qrCodeImage) {
      fs.unlink(path.join(uploadsDir, deleted.qrCodeImage), () => {});
    }

    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};


