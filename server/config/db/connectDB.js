const mongoose = require('mongoose');
const JSON_ENV = require("../config.json")

const connectDB = async () => {
      try {
         await mongoose.connect(JSON_ENV.DB_CONFIG.DB_URL, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true,
               dbName: JSON_ENV.DB_CONFIG.DB_NAME
         });
         console.log("DB Connected");
      }
      catch (err) {
         throw err;
      }
}
module.exports = { connectDB };