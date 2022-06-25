const router = require('express').Router();
const {page0, Login, Register} = require('../Controllers/controller');

let page0CB = (req, res) => page0(req, res),
LoginCB = (req, res) => Login(req, res),
RegisterCB = (req, res) => Register(req, res);


router.get('/', page0CB)
      .post('/api/login/user', LoginCB)
      .post('/api/register', RegisterCB)

module.exports = { router }