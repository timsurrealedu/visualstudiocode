require('dotenv').config(); // Load the .env variables

const config = {
    port: process.env.PORT || 3000,
    environment: process.env.NODE_ENV || 'development'
};

module.exports = config; // Exporting, similar to making a function 'public' in a header file