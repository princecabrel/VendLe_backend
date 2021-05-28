const user = require('../models/User.model');
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
const UserModel = require("./User.model");
const { request } = require('express');




UserModel.pre('save', function(next){
    if(!user.isModified('password')) 
    return next();
    bcrypt.genSalt(10, function(err,salt){
        if (err)
        return next(err);
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err)
            return next(err);

            user.password=hash;
            next();
        });
    });
});

UserModel.methods.comparePassword = function(password){
        return bcrypt.compareSync(password, this.password);

};
UserModel.methods.generateJWT = function(){
    const now = new Date();
    const expirationDate = new Date(now);
    expirationDate.setDate(now.getDate()+60);

    let payload = {
        id: this.id,
        email: this.email,
        fullName: this.fullName,
        username:this.username,
        
    };
};

UserModel.methods.generatePasswordReset = function(){
    this.generatePasswordToken = crypto.randomBytes(20).toString('hex');
    this.generatePassworExpires = Date.now() + 3600000;
}

mongoose.set('useFindAndModify', false)



