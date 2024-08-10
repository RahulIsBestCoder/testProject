const dotenv = require('dotenv');
dotenv.config();

const config = {
  development: {
    mongoURI: process.env.MONGO_URI ,
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    apiEndpoint: process.env.API_ENDPOINT,
  },
  test: {
    mongoURI: process.env.MONGO_URI,
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET,
    apiEndpoint: process.env.API_ENDPOINT,
  },
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
