const mongoose =require('mongoose');
const { Schema } = mongoose;
const messageSchema=require('/message.js)
  const chatSchema = new Schema{

	ownerID:{
		type:String,
		required:true
	},
	messages:[messageSchema],
	members:[String],
	productID:{
		type:String,
		required:true
	},
	dateCreated:{
    	type:Date
    },
    dateUpdated:{
    	type:Date
    },
    history:[{
	    oldrecord:[String],
	    newrecord:[String],
	    Datecreated:{
	        type:Date
	    }
	}]
}

/*Recommended
-ownerID
-productID
*/