// Load config file
const dotenv = require('dotenv');
dotenv.config();

// Environments configuration
const dev = {
  name: 'Development',
  db: process.env.DEV_DB,
};

const prod = {
  name: 'Production',
  db: process.env.PROD_DB,
};

const test = {
  name: 'Test'
};

const env = process.env.NODE_ENV;
const config = { dev, prod, test };
module.exports = config[env];