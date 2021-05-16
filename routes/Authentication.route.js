const express =require('express');
const Router=express.Router();

const Register=require('../controllers/Register.controller.js');
const Login=require('../controllers/Login.controller.js');

Router.post('/Register',Register.register);
Router.post('/Login',Login.login);

module.exports=Router