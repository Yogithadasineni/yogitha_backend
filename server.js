
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const EmployeeRoutes = require('./routes/employeeRoutes');
// const AssetRoutes = require('./routes/assestRoutes');
// const path = require('path');
// const cors = require('cors');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Serve uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// // app.use('/emp', EmployeeRoutes);
// // app.use('/assets', AssetRoutes);


// // Routes
// app.use('/api/employees', EmployeeRoutes);
// app.use('/api/assets', AssetRoutes);


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));












const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const EmployeeRoutes = require('./routes/employeeRoutes');
const AssetRoutes = require('./routes/assestRoutes');
const path = require('path');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files
app.use('/photos', express.static(path.join(__dirname, 'uploads/photos')));
app.use('/documents', express.static(path.join(__dirname, 'uploads/documents')));
app.use('/qrcodes', express.static(path.join(__dirname, 'uploads/qrcodes')));

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/employees', EmployeeRoutes);
app.use('/api/assets', AssetRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
