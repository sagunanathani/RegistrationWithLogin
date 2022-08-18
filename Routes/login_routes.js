const express = require('express');
const router = express.Router();
const register = require("../Controller/regwithlogin");

router.get('/get_data/register', register.getRegister);
router.post('/post_data/register', register.register);

router.get('/get_data/login', register.getLogin);
router.post('/post_data/login',register.login);

module.exports = router;