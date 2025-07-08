
// const express = require('express');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const EmployeeRoutes = require('./routes/employeeRoutes');
// const AssetRoutes = require('./routes/assestRoutes');
// const path = require('path');


// const cors = require('cors');
// app.use(cors());


// dotenv.config();
// connectDB();

// const app = express();

// app.use(express.json());

// // Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/emp', EmployeeRoutes);
// app.use('/assets', AssetRoutes);

// const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.listen(PORT, '0.0.0.0', () =>
//   console.log(`✅ Server running on http://0.0.0.0:${PORT}`)
// );







const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Make sure you import cors at the top
const path = require('path');

const connectDB = require('./config/db');
const EmployeeRoutes = require('./routes/employeeRoutes');
const AssetRoutes = require('./routes/assestRoutes');

dotenv.config();
connectDB();

const app = express(); // 🟢 Define app BEFORE using it

app.use(cors()); // ✅ Now this line is after app is defined
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/emp', EmployeeRoutes);
app.use('/assets', AssetRoutes);

// ✅ Listen on 0.0.0.0 to allow mobile devices to connect
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`✅ Server running on http://0.0.0.0:${PORT}`)
);
