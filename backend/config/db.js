const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true); // Optional, for strict schema queries

    const conn = await mongoose.connect(process.env.MONGO_URL); // ✅ cleaned up

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(`Message: ${error.message}`);
    console.error(`Stack Trace:\n${error.stack}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
 