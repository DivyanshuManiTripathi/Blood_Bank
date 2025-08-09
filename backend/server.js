const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path')
const app = express();
// dot config
dotenv.config(); 
// mongoDB connection
connectDB();
// middlewares
const allowedOrigins = [
  'https://blood-bank-6fkr.vercel.app',  
  'https://blood-bank-6fkr-5njj6tt1p-divyanshu-mani-tripathis-projects.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
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
// Handle preflight requests for all routes
app.options('*', cors(corsOptions));


app.use(express.json());
app.use(morgan('dev'));  
// routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/inventory', require('./routes/inventoryRoutes'));
app.use('/analytics', require('./routes/analyticsRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
// Static Folder
app.use(express.static(path.join(__dirname, './client/dist')))

// Static Routes
// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, './client/dist/index.html'));
// }); 
app.get('/',(req,res)=>{
  console.log("sever is runing") 
 // res.send("hoioiii") 
}) 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.DEV_MODE} mode at port ${ PORT}`);
})