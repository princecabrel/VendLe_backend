const express = require('express');
const { router } = require('..');
const Router =express.Router();
const Product = require('../controllers/Product.controller')


Router.post ('/produit/create', Product.postProduct)
Router.get('/produit', Product.getAllProduct)
Router.get('/produit/:id', Product.getOneProduct)
Router.put('/produit/update', Product.updateProduct)
Router.delete('/produit/delete', Product.deleteOneProduct)

module.exports=Router