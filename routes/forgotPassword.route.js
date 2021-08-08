const express = require('express')
const router = express.Router();
const forgotPassword = require('../controllers/forgotPasword.controller.js');

router.post('/req/reset/password', forgotPassword.ResetPassword);
router.post('/new/password',forgotPassword.NewPassword);
router.post('/valid/password/token',forgotPassword.ValidPasswordtoken)
router.get('/token',forgotPassword.GetAllToken);


module.exports=router;