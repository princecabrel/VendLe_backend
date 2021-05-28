const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
	fullName:{
		type:String
	},
	password:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		trim : true,
		unique: true
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
	resetPasswordToken:{
		type: String,
		required: false
	},
	resetPasswordExpires:{
		type: Date,
		required: false
	},
	

},{timestamps : true}
)

module.exports=mongoose.model('User',UserSchema);