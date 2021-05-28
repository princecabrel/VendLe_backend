const express = require('express');
const Router =express.Router();

const trans = require('../controllers/Transaction.controller')



Router.post('/transaction/create', trans.postTransactions)
Router.get('/transaction', trans.getTransactions)
Router.get('/transaction/:id', trans.getOnetransaction)
Router.delete('/transaction/delete', trans.deleteTransactions)
Router.put('/transaction/update', trans.updateTransaction)


module.exports = Router;