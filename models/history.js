const { Schema } = mongoose;

  const historySchema = new Schema({
	oldrecord:[String],
	newrecord:[String],
	Datecreated:{
    	type:Date
    }
})