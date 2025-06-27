const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true); // Optional: useful for avoiding strict query warnings
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:");
    console.error(`Message: ${error.message}`);
    console.error(`Stack Trace:\n${error.stack}`);
    process.exit(1); // Exit the process if DB connection fails
  }
};

module.exports = connectDB;
