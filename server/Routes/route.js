const router = require('express').Router();
const {page0, Login, Register, BookCoures } = require('../Controllers/controller');

let page0CB = (req, res) => page0(req, res),
LoginCB = (req, res) => Login(req, res),
RegisterCB = (req, res) => Register(req, res),
BookCouresCB = (req, res) => BookCoures(req, res)


router.get('/', page0CB)
      .post('/api/login', LoginCB)
      .post('/api/register', RegisterCB)
      .post('/api/bookCourse', BookCoures)

module.exports = { router }