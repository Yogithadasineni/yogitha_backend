// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const {
//   createEmployee,
//   getAllEmployees,
//   getEmployee,
//   editEmployee,
//   deleteEmployee,
// } = require('../controllers/employeeController');

// const router = express.Router();

// // Upload config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) =>
//     cb(null, Date.now() + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // Routes
// router.post('/add', upload.single('photo'), createEmployee);
// router.get('/all', getAllEmployees);
// router.get('/employee/:empid', getEmployee);
// router.put('/employee/:empid', upload.single('photo'), editEmployee); // ✅ Edit

// router.delete('/employee/:empid', deleteEmployee); // ✅ Delete

// module.exports = router;









const express = require('express');
const multer = require('multer');
const path = require('path');
const {
  createEmployee,
  getAllEmployees,
  getEmployee,
  editEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');

const router = express.Router();

// Upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ROUTES
router.post('/add', upload.single('photo'), createEmployee);
router.get('/all', getAllEmployees);
router.get('/employee/:empid', getEmployee);
router.put('/employee/:empid', upload.single('photo'), editEmployee);
router.delete('/employee/:empid', deleteEmployee);

module.exports = router;
