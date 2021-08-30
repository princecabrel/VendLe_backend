const express= require('express')
const router= express.Router();
const Favoris=require('../controllers/Favoris.controller.js')



router.put('/favoris/update/:id',Favoris.addFavoris)



module.exports=router;