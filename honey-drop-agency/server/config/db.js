// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 1. Get URI from Environment Variable
    const connString = process.env.MONGO_URI;

    // 2. Check if URI exists
    if (!connString) {
      console.error("❌ Error: MONGO_URI is not defined in Environment Variables.");
      process.exit(1);
    }

    // 3. Connect
    const conn = await mongoose.connect(connString);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;