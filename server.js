// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const EmployeeRoutes = require('./routes/employeeRoutes');
// // const AssetRoutes = require('./routes/assetRoutes');
// const AssetRoutes = require('./routes/assestRoutes');


// const path = require('path');

// dotenv.config();
// connectDB();

// const app = express();



// app.use(express.json());
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // Serve uploaded files

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// app.use('/emp', EmployeeRoutes);
// app.use('/assets', AssetRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));










const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const EmployeeRoutes = require('./routes/employeeRoutes');
const AssetRoutes = require('./routes/assestRoutes');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/emp', EmployeeRoutes);
app.use('/assets', AssetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
