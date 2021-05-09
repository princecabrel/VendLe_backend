const express = require('express');
const Router =express.Router();

const User=require('../controllers/Profile.controller.js');
const Register=require('../controllers/Register.controller.js');
const Login=require('../controllers/Login.controller.js');

Router.post('/Register',Register.Register)
Router.post('/Login',Login.Login)

module.exports=Router;