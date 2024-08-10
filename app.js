const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config(); 

const connectDB = require("./server"); // Import the MongoDB connection function
const config = require("./src/configaration/config");

const app = express();
const port = config.port

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
