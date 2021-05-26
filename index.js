const express =require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const dbConnect = require('./db.connect.js');
const Profile=require('./routes/Profile.route.js');
const Authentication=require('./routes/Authentication.route.js');
const Plan = require('./routes/Plan.route.js');
const Category= require('./routes/Category.route.js');
const Alert= require('./routes/Alert.route.js')

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
app.use('/', Plan)
app.use('/', Category)
app.use('/', Alert)


module.exports=app