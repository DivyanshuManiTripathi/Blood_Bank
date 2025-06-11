const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const cors=require('cors');
const app=express();
// dot config
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.DEV_MODE} mode at port ${process.env.PORT}`);
})