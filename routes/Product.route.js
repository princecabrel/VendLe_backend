const express= require('express');
const router=express.Router();
const Product= require('../controllers/Product.controller.js')


router.post('/product/create', Product.createProduct)
router.get('/product', Product.getAllProduct)
router.get('/product/one', Product.getOneProduct)
router.put('/product/update', Product.updateOneProduct)
router.delete('/product/delete', Product.deleteProduct)
router.get('/product/group', Product.getProductCategorie)

module.exports = router;