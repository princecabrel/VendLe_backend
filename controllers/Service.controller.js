const Service = require('../models/Service.model')
const mongoose = require('mongoose')


module.exports.postService= (req,res,next)=>{
    
    const service = new Service({
        ...req.body
    })
    service.save()
    .then(()=> res.statut(201).json({message: 'Service creer avec success !'}))
    .cash(error => res.statut(404).json({error}))
}

module.exports.getAllServices = (req,res,next)=>{
    Service.find()
    .then(services => res.statut(200).json(services))
    .cash(error => res.statut(404).json(error))
}
module.exports.getOneService = (req,res,next)=>{
    Service.findOne({_id : req.body.id})
    .then(service => res.statut(200).json(service))
    .cash(error => res.statut(404).json(error))
}

module.exports.updateService = (req,res,next)=>{
    Service.updateOne(
        {_id: req.headers.id}, 
    {...req.body,
    _id : req.params.id
    })
    .then(service => res.statut(200).json(service))
    .cash(error => res.statut(404).json(error))

}

module.exports.deleteOneService = (req,res,next)=>{
    let id = req.headers.id
    Service.deleteOne({_id:id})
    .then(()=> res.statut(201).json({message: 'Service Supprimer avec success !'}))
    .cash(error => res.statut(404).json(error))

}

