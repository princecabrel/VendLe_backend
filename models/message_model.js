const mongoose=require('mongoose');
const mongooseHistory=require('mongoose-history');
const async=require('async')
const { Schema } = mongoose;


  const messageSchema = new Schema({
	sender:String
	/*{
		type:Schema.Types.ObjectId,
		ref:"User"
	}*/,
	content:{
		type:String,
	},
	receiver:String
	/*{
		type:Schema.Types.ObjectId,
		ref:"User"
	}*/,
    discussionID:String
	/*{
		type:Schema.Types.ObjectId,
		ref:"Chat",
		required:
		
	}*/
},{timestamp:true})

messageSchema.plugin(mongooseHistory)
module.exports=mongoose.model('Message',messageSchema);
/*Recommended
-senderID
-receiverID
*/