require('dotenv').config();

// object.freeze-You can’t change values later by mistake,Prevents accidental overwrites
const config = Object.freeze({
  port: process.env.PORT || 3000,
  databaseURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/pos-db',
  nodeEnv: process.env.NODE_ENV || 'development',
  accessTokenSecret: process.env.JWT_SECRET,
});

module.exports = config;
