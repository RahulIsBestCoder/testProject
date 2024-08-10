const mongoose = require("mongoose");
const config   = require("./src/configaration/config")

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoURI);
        console.log("Connected to MongoDB");
      } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
      }
};

module.exports = connectDB;
