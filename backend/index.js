const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');
const kycRoutes = require('./routes/kycRoutes');
const pricesRoutes = require('./routes/pricesRoutes');
const fundsRoutes = require('./routes/fundsRoutes');
const depositAddressRoutes = require('./routes/depositAddressRoutes');
const path = require('path');

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());  // JSON parsing for incoming requests
app.use(helmet());  // Security headers

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api', tradeRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/kyc', kycRoutes);
app.use('/api', pricesRoutes);
app.use('/api/funds', fundsRoutes);
app.use('/api/deposit', depositAddressRoutes);



// Error handling for 404 routes
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error', error: err.message });
});

// Server Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
