// const Employee = require('../models/Employee');

// exports.createEmployee = async (req, res) => {
//   try {
//     const { empid, name, dept, phone, address } = req.body;
//     let training = req.body.training || [];

  
//     // Handle single string or array
//     if (typeof training === 'string') {
//       training = [training];
//     }

//     const photo = req.file ? req.file.filename : '';
//     const trainingStr = training.join('-');

//     const existing = await Employee.findOne({ empid });
//     if (existing) {
//       return res.status(400).json({ error: 'Employee ID already exists' });
//     }

//     const link = `emp://empid=${empid}&name=${encodeURIComponent(name)}&dept=${dept}&phone=${phone}&address=${encodeURIComponent(address)}&training=${trainingStr}&photo=${photo}`;

//     const employee = new Employee({
//       empid,
//       name,
//       dept,
//       phone,
//       address,
//       training,
//       photo,
//       link
//     });

//     await employee.save();
//     res.status(201).json({ message: 'Employee created', data: employee, link });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// };

// exports.getEmployee = async (req, res) => {
//   try {
//     const empid = req.params.empid;
//     const employee = await Employee.findOne({ empid });

//     if (!employee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     res.json(employee);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// };

// exports.getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find({});
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error', details: err.message });
//   }
// };










// controllers/employeeController.js
const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  try {
    const { empid, name, dept, phone, address } = req.body;
    let training = req.body.training || [];

    // Parse training array if sent as stringified JSON
    if (typeof training === 'string') {
      try {
        training = JSON.parse(training);
      } catch {
        training = [training];
      }
    }

    const photo = req.file ? req.file.filename : '';
    const trainingStr = training.join('-');

    const existing = await Employee.findOne({ empid });
    if (existing) {
      return res.status(400).json({ error: 'Employee ID already exists' });
    }

    const link = `emp://empid=${empid}&name=${encodeURIComponent(name)}&dept=${dept}&phone=${phone}&address=${encodeURIComponent(address)}&training=${encodeURIComponent(trainingStr)}&photo=${photo}`;

    const employee = new Employee({
      empid,
      name,
      dept,
      phone,
      address,
      training,
      photo,
      link
    });

    await employee.save();
    res.status(201).json({ message: 'Employee created', data: employee, link });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const empid = req.params.empid;
    const employee = await Employee.findOne({ empid });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
