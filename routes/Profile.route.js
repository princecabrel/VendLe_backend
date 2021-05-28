const express = require('express');
const Router =express.Router();
const auth=require('../middlewares/auth.js')
const Profile=require('../controllers/Profile.controller.js');
const upload=require('../middlewares/upload.js')


Router.get('/profiles',auth,Profile.getAllProfile)
Router.get('/profile/:id',auth,Profile.getOneProfile)
Router.put('/profile/update',auth,Profile.updateProfile)
Router.delete('/profile/:id',auth,Profile.deleteProfile)
Router.get('/profile/image/:id',auth,Profile.getProfileImage)
Router.get('/home',auth,Profile.debut)
Router.put('/profile/image/:id',auth,upload.upload,Profile.updateProfileImage)

module.exports=Router;


