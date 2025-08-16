const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// dotenv config
dotenv.config();

// mongoDB connection
connectDB();

// allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://blood-bank-3ncy.vercel.app'
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

//  Apply CORS middleware (this automatically handles OPTIONS requests)
app.use(cors(corsOptions));

// body parser & logger
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/inventory', require('./routes/inventoryRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// serve static client build
app.use(express.static(path.join(__dirname, './client/dist')));

// root route
app.get('/', (req, res) => {
  console.log("server is running");
  res.send("API is running ✅");
});

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.DEV_MODE} mode at port ${PORT}`);
});
