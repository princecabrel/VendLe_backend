const mongoose=require('mongoose');
const { Schema } = mongoose;

  const messageSchema = new Schema({
	sender:{
		name:String,
		senderID:String
	},
	content:{
		type:String,
	},
	receiver:{
		name:String,
		senderID:String
	},
	dateCreated:{
    	type:Date,
    	default:Date.now()
    },
    discussionID:{type:String,required:true}
})

module.exports=mongoose.model('Message',messageSchema);
/*Recommended
-senderID
-receiverID
*/