const express = require('express');
const userController = require('../controllers/users');
const validation = require('../middlewares/validation');

const router = express.Router();

//POST method to sign-up
router.post('/signup', validation.user_validators, userController.signup);

//POST method to login 
router.post('/login', validation.user_validators, userController.login);


module.exports = router;
