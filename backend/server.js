const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// dot config
dotenv.config(); 

// mongoDB connection
connectDB();

// middlewares
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-frontend.vercel.app' // 🔹 deploy hone ke baad yaha apna frontend link daal dena
]; 

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false); // Block silently
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

// Apply CORS for all requests
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(morgan('dev'));  

// routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/inventory', require('./routes/inventoryRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// Static Folder (for client build if needed)
app.use(express.static(path.join(__dirname, './client/dist')));

// Root Route
app.get('/', (req, res) => {
  res.send("Server is running 🚀");
});

// ❌ REMOVE app.listen()
// ✅ Instead, export app (Vercel will handle server)
module.exports = app;
