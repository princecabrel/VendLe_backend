const express = require('express');
const Router =express.Router();

const Profile=require('../controllers/Profile.controller.js');
const upload=require('../middlewares/upload.js')


Router.get('/profiles',Profile.getAllProfile)
Router.get('/profile/:id',Profile.getOneProfile)
Router.put('/profile/:id',Profile.updateProfile)
Router.delete('/profile/:id',Profile.deleteProfile)
Router.get('/profile/image/:id',Profile.getProfileImage)
Router.put('/profile/image/:id',upload.upload,Profile.updateProfileImage)

module.exports=Router;


