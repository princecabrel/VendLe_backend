const express= require('express')
const router= express.Router()
const subCategory= require('../controllers/subCategory.controller.js')



router.post('/subcat', subCategory.createSubCategory)

module.exports= router;