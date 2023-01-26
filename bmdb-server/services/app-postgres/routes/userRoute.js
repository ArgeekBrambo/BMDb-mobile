const express = require('express');
const router = express.Router();
const ControllerUser = require('../controllers/ControllerUser');
const authentication = require('../middlewares/auth');

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)

module.exports = router