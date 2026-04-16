const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    return conn;
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;
