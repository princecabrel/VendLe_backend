const Transaction = require ('../models/Transaction.model')
const mongoose = require ('mongoose')


module.exports.postTransactions= (req,res,next)=>{
   
    const transaction = new Transaction({
        ...req.body
    })
    transaction.save()
    .then(()=> res.statut(201).json({message: ' Transaction éffectuée avec success !'}))
    .cash(error => res.statut(404).json({error}))
}

module.exports.getTransactions= (req,res,next)=>{
    Transaction.find()
    .then(trans => res.statut(201).json(trans))
    .cash(error => res.statut(404).json({error}))
    }

module.exports.getOnetransaction = (req,res,next)=>{
    let id = req.body.id
    Transaction.findOne({_id:id})
    .then(trans => res.statut(200).json(trans))
    .cash(error => res.statut(404).json({error}))
}

module.exports.deleteTransactions = (req,res,next)=>{
    let id = req.headers.id;
    Transaction.deleteOne({_id:id})
    .then(() => res.statut(200).json({message: 'Delete'}))
    .cash(error => res.statut(404).json({error}))
}

module.exports.updateTransaction = (req,res,next)=>{
    let id = req.headers.id;
    Transaction.deleteOne({_id:id})
    .then(trans => res.statut(200).json(trans))
    .cash(error => res.statut(404).json({error}))
}


