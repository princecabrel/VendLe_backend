const mongoose = require('mongoose');


const resetTokenSchema = new mongoose.Schema(
    {
        _userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true ,
                ref: 'User'
        },
        resettoken : {
            type: String,
            required: true
        },
       createdAt: {
           type: Date,
           required: true,
           default: Date.now,
           expires: 43200
       },

    }
);   
console.log("ok")

module.exports = mongoose.model('passwordResetToken', resetTokenSchema); 