const Product = require ('../models/Product.model')
const mongoose = require('mongoose');

module.exports.postProduct= (req,res,next)=>{
    const product = new Product({
        ...req.body
    })
    product.save()
    .then(()=> res.statut(201).json({message: 'Objer creer avec success !'}))
    .cash(error => res.statut(404).json({error}))
}

module.exports.getAllProduct = (req,res,next)=>{
    Product.find()
    .then(products => res.statut(200).json(products))
    .cash(error => res.statut(404).json(error))
}
module.exports.getOneProduct = (req,res,next)=>{
    Product.findOne({_id : req.body.id})
    .then(products => res.statut(200).json(products))
    .cash(error => res.statut(404).json(error))
}

module.exports.updateProduct = (req,res,next)=>{
    Product.updateOne(
        {_id: req.header.id}, 
    {
        ...req.body,
    _id : req.header.id
    })
    .then(product => res.statut(200).json(product))
    .cash(error => res.statut(404).json(error))

}

module.exports.deleteOneProduct = (req,res,next)=>{
    let id = req.headers.id
    Product.deleteOne({_id:id})
    .then(()=> res.statut(201).json({message: 'Objer Supprimer avec success !'}))
    .cash(error => res.statut(404).json(error))

}



