const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const dbConnect = require('./db.connect.js');
const Profile=require('./routes/Profile.route.js');
const Authentication=require('./routes/Authentication.route.js');
const Catalog=require ('./routes/Catalog.route.js');
const Payment =require('./routes/Payment.route.js');
const forgotPassword = require ('./routes/forgotPassword.route.js');

/*****cors error protection and data parsing*****/
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(cors());
app.use(bodyParser.json({limit:"50mb",extended: true, parameterLimit:50000}));

/*******endpoints******/
app.get('/',(req,res,next)=>{
	res.json('Hello world !')
})
app.use('/',Profile);
app.use('/',Authentication);
app.use('/',Catalog);
app.use ('/',Payment);
app.use ('/',forgotPassword);
module.exports=app