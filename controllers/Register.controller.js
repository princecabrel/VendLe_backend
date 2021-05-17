const jwt =require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User.model.js');
require('dotenv').config();

module.exports.register=(req,res,next)=>{
	const {email,phone,gender,birthday,password,username}=req.body;
	console.log(req.body);
	bcrypt.hash(password,10)
	.then(hash=>{
		const user = new User({
			// email,
			// phone,
			// gender,
			// birthday,
			...req.body,
			password:hash,
			role:'user'
		})
		user.save()
		.then(user=>{
			if(!user)
				return res.status(400).json({error:'user are not created'})
			let token = jwt.sign({user:user},process.env.JWT_KEY);
			res.status(200).json({auth:true,token:token,message:'account created !',user:user});
			console.log(user);
		})
		.catch(error=>{
			res.status(500).json({message:'error ! account not created'});
			console.log('account',error);
		})
	})
	.catch(error=>console.log('bcrypt',error))
}