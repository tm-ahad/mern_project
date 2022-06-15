const mongoose = require('mongoose');

const sChem = new mongoose.Schema(
   {
       name: {
          type: String,
          required: true,
          maxlength: 20,
          minlength: 3
       },
       age: {
         type: Number,
         required: true,
         max: 100,
         min: 3
       },
       email: {
          type: String,
          required: false,
          maxlength: 100,
          minlength: 3,
          unique: true,
       },
       password: {
           type: String,
           required: false,
           maxlength: 20,
           minlength: 6,
           unique: true
        },
        accountName: {
           type: String,
           required: false,
           maxlength: 20,
           minlength: 2,
           unique: true,
        }
  
  }
);
const User = mongoose.model('User', sChem)
module.exports = { User }