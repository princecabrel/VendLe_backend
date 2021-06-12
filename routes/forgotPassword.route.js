const express= require('express');
const router = express.Router();
const forgotPassword = require('../controllers/forgotPassword.controller.js');


router.post('/req/reset/password',forgotPassword.ResetPassword);
router.post('/new/password',forgotPassword.NewPassword);
router.post('/valid/password/token',forgotPassword.ValidPassworToken);


   




module.exports = router ; 