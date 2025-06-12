const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const cors=require('cors');
const connectDB = require('./config/db');
const app=express();
// dot config
dotenv.config();
// mongoDB connection
connectDB();
// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// routes
app.use('/api/v1/auth',require('./routes/authRoutes'));

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.DEV_MODE} mode at port ${process.env.PORT}`);
})