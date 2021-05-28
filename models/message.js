const mongoose=require('mongoose');
const { Schema } = mongoose;

  const messageSchema = new Schema({
	senderID:{
		type:String,
		required:true
	},
	content:{
		type:String,
	},
	receiverID:{
		type:String,
		required:true
	},
	dateCreated:{
    	type:Date
    },
})

/*Recommended
-senderID
-receiverID
*/