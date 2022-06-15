const jwt = require('jsonwebtoken');

function createJWT(user) {
      return jwt.sign({
         id: user._id,
         email: user.email,
         name: user.name,
         acountName: user.acountName
      }, process.env.JWT_SECRET, {
         expiresIn: "1h"
      });
   }

   module.exports = { createJWT }