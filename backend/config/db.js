const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // Get access to config.get from config and set it to name of variable from default file

// Connect database using mongoose.
// If error then exit with failure.
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
