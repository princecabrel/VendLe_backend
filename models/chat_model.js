const { ObjectId } = require('mongodb');
const mongoose =require('mongoose');
const { Schema } = mongoose;

  const chatSchema = new Schema({

	name:{
		type:String,
		unique:true,
		required:true
	},
	product:{
		type:Schema.Types.ObjectId,
		ref:"Product",
		required:true
	},
	deleted:{
		type:Boolean
	}
    },{timestamps:true})
module.exports=mongoose.model('Chat',chatSchema);
/*Recommended
-ownerID
-productID
*/