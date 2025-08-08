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
  'http://localhost:5173'
];
   
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman, curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); 



app.use(express.json());
app.use(morgan('dev'));  
// routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
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