const express = require('express')
const router = express.Router();
const catalog= require('../controllers/Catalog.controller.js')



router.post('/catalog/create',catalog.createCatalog)
router.get('/catalog',catalog.getAllCatalog)
router.get('/catalog/one',catalog.getOneCatalog)
router.put('/catalog/:id',catalog.updateCatalog)
router.delete('/catalog/:id',catalog.deleteCatalog)


module.exports= router;