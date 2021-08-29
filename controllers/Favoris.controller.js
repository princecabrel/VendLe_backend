const mongoose = require("mongoose")
const User = require("../models/User.model")




module.exports.addFavoris=(req, res, next)=>{
    console.log(req.body)
    console.log(req.params.id)
    User.updateOne({_id:req.params.id},{$push:{favoris:req.body.productId }})

.then(Favoris=>{
	res.status(200).json({
		message:'Favoris add succeffully',
		Favoris:Favoris
	})
})

 .catch(error=>{
 	res.status(400).json({error})
 	console.log(error)
 })
}