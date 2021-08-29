const mongoose=require('mongoose');
const product  = require('../models/product')

const UserSchema=mongoose.Schema({
	fullName:{
		type:String
	},
	password:{
		type:String,
		required:true,
		min: [5, 'Too short, min is 5 characters'],
		max: [32, 'Too long, max is 32 characters'],
	},
	email:{
		type:String,
		required:true,
		trim : true,
		unique: true,
		lowercase: true,
		min: [5, 'Too short, min is 5 characters'],
		max: [32, 'Too long, max is 32 characters'],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
	},
	username:{
		type:String,
		required:true,
		unique:true
	},
	phone:{
		type:Number,
		required:true
	},
	gender:{
		type:String,
	},
	birthday:{
		type:String,
    },
    country:{
		type:String,
    },
    city:{
		type:String,
    },
    quarter:{
		type:String,
    },
    job:{
		type:String,
    },
    dateCreated:{
		type:Date,
    },
    dateUpdated:{
		type:Date,
    },
	favourites:	{},
    followers:[String],
    followings:[String],
    profileUrl:{
		type:String,
    },
    role:{
		type:String,
    },
    profileImage:{
		_id:String,
		userID:String,
		filename:String,
		chunkSize:Number,
		uploadDate:Date,
		md5:String,
		isImage:Boolean,
		length:Number,
		fieldname:String,
		size:Number,
		contentType:String,
		bucketName:String,
		encoding:String,
		mimetype:String
	},
    history:[{
		collectionName:String,
		column_name:String,
		oldValue:String,
		newValue:String,
		updateAt: Date
    }],
	

}
)

module.exports=mongoose.model('User',UserSchema);