const express = require("express");
const router = express.Router();
const path = require('path')
const userControllers = require('../controllers/userControllers')


//rutas login y register

router.get('/login', userControllers.login)
router.get('/register', userControllers.register)

module.exports = router