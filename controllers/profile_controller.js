const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
BSONPure = require('bson').BSONPure
const {ObjectID, ObjectId}=require('mongodb')
const User = require('../models/user_model.js');
require('dotenv').config();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
// Mongo URI
const mongoURI = process.env.MONGO_URI;
// Create mongo connection
const conn = mongoose.createConnection(mongoURI,{ useUnifiedTopology: true ,useNewUrlParser: true});
// Init gf
let gfs;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
	cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
	api_key:process.env.CLOUDINARY_API_KEY,
	api_secret:process.env.CLOUDINARY_API_SECRET
})
conn.once('open', () => {
  // Init stream
  mongoose.mongo.BSONPure = BSONPure;
  gfs = Grid(conn.db, mongoose.mongo);  
  gfs.collection('Images');
});




module.exports.getAllProfile=(req,res,next)=>{
	User.find()
	.populate('favoris')
	.then(user=>res.status(200).json({Users:user}))
	.catch(error=>{
		console.log('users find error : ',error);
		res.status(500).json({message:error.message});
	})
}

module.exports.getOneProfile=(req,res,next)=>{
	let id = req.params.id
	User.findOne({_id:id})
	.then(user=>res.status(200).json({User:user}))
	.catch(error=>{
		console.log('user find error : ',error);
		res.status(500).json({message:error.message});
	})
}


module.exports.updateProfile=(req,res,next)=>{
	let id =req.headers.id;

	User.findOneAndUpdate({_id:id},{...req.body})
	.then(user=>res.status(200).json({message:`User ${user.username} was updated successfully !`,User:user}))
	.catch(error=>{
		console.log('error on profile Update !',error);
		res.status(500).json({message:error.message});
	})
	
}

module.exports.deleteProfile=(req,res,next)=>{
	let id=req.headers.id
	User.findOneAndDelete({_id:id})
	.then(user=>res.status(200).json({message:`User ${user.username} account was delete successfully !`}))
	.catch(error=>{
		console.log('error when trying to delete profile ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.getProfileImage=async (req,res,next)=>{
	let filename=getID(req.params.filename)
	console.log(filename);
	gfs.files.findOne({filename:filename},(err,file)=>{
		console.log(file)
		// check if image exist
		if (!file || file.length ===0) {
			return res.status(404).json({message:'this service image does not exist'})
		}
		const readstream = gfs.createReadStream(file.filename);
      	return readstream.pipe(res);
	})
}

module.exports.updateProfileImage = async (req, res) => {
		try {
			// Upload image to cloudinary
			let id=req.params.id
			const result = await cloudinary.uploader.upload(req.file.path);
			console.log(result)
			User.findOneAndUpdate({id:id},{profileUrl:{url:result.url,public_id:result.public_id}})
			.then(user=>res.status(200).json({message:'user updated successfully',user:user}))
			.catch(err=>res.status(500).json({message:'An error occur !',error:err}))
		  } catch (err) {
			console.log(err);
			res.status(500).json({message:'An error occur !',error:err})
		  }
	//if(req.files.profile==null)return res.status(500).json('Aucune image selectionnéé');
	//const url=`http://localhost:50002/profile/image/${req.files.profile[0].filename}`
	//return res.status(200).json(req.files.url)
}


   module.exports.editUser =(req,res,next)=>{
         /*allowedFields represente ici les champs que l'utilisateur est autorise a modifier dans son profil*/
         const allowedFields= { fullName: req.body.fullName, username: req.body.username, phone: req.body.phone, gender: req.body.gender, country: req.body.country, city: req.body.city,}
         User.findOne({_id:req.headers.id}, function (err,user) {

            if (err) {
            	next(err);
            } else if(user) {

            	req.user=user;
            	user = Object.assign(user, allowedFields);

            	user.save((err, savedUser)=>{
            		if(err){
            			return next(err);
            		}
            		res.json(savedUser.toJSON());
            	});

            } else {
            	  next(new Error('failed to load user'));
            }

         })
   }





 function getID (id){
	 return id;
}

module.exports.debut=(req,res,next)=>{
	res.json('Hello world !')
}