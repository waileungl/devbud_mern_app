// 1. import mongoose
const mongoose = require('mongoose');

// We will export the connection to the DB, which will be used in ther server.js
module.exports = (DB_NAME) => {
  mongoose
    .connect(`mongodb://localhost/${DB_NAME}`)
    .then(() => console.log(`CONNECTED TO ${DB_NAME}`))
    .catch((err) => console.log(`Cannot connect to ${DB_NAME}`, err));
};
