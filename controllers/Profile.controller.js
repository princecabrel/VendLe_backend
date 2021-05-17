const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User.model.js');
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

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);  
  gfs.collection('Images');
});

module.exports.getAllProfile=(req,res,next)=>{
	User.find()
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
	let id =req.params.id;
	let password=req.body.password;

	User.findOneAndUpdate({_id:id},{...req.body})
	.then(user=>res.status(200).json({message:`User ${user.username} was updated successfully !`,User:user}))
	.catch(error=>{
		console.log('error on profile Update !',error);
		res.status(500).json({message:error.message});
	})
	
}

module.exports.deleteProfile=(req,res,next)=>{
	let id=req.params.id
	User.findOneAndDelete({_id:id})
	.then(user=>res.status(200).json({message:`User ${user.username} account was delete successfully !`}))
	.catch(error=>{
		console.log('error when trying to delete profile ',error);
		res.status(500).json({message:error.message});
	})
}
module.exports.getProfileImage=async (req,res,next)=>{
	let userID=getID(req.params.id)
	gfs.files.findOne({metadata:userID},(err,file)=>{
		console.log(file)
		// check if image exist
		if (!file || file.length ===0) {
			return res.status(404).json({message:'this profile image does not exist'})
		}
		const readstream = gfs.createReadStream(file.filename);
      	return readstream.pipe(res);
	})
}

module.exports.updateProfileImage=(req,res,next)=>{
	let id=req.params.id
	console.log(req.files.profile)
	User.updateOne({_id:id},{profileImage:req.files.profile[0],profileUrl:`http://localhost:50002/profile/image/${id}`})
	.then(user=>res.status(200).json({message:`profile Image of ${user.fullname} was updated`}))
	.then(error=>res.status(404).json({message:'User does not exist'}))
}
 function getID (id){
	 return id;
}