const mongoose=require('mongoose');

const { Schema } = mongoose;



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
		required:true,
		unique:true
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
		default:Date.now()
    },
    dateUpdated:{
		type:Date,
    },
    followers:[String],
    followings:[String],
	discussions:[{
		type:Schema.Types.ObjectId,
		ref:"Chat"
	}],
    image:{},
    role:{
		type:String,
    },
	favoris:[{
		id:{
			type:Schema.Types.ObjectId,
			ref:"Product"
		},
		type:String
		}],
		/*service:[{
			type:Schema.Types.ObjectId,
			ref:"Service"
		}],
		
	},*/
    history:[{
		collectionName:String,
		column_name:String,
		oldValue:String,
		newValue:String,
		updateAt: Date
    }],
	

},{timestamps:true}
)

module.exports=mongoose.model('User',UserSchema);