const express = require('express');
const Router =express.Router();


const Service = require('../controllers/Service.controller')


Router.post('/service/create', Service.postService)
Router.get('/service', Service.getAllServices)
Router.get('/service/:id', Service.getOneService)
Router.put('/service/update', Service.updateService)
Router.delete('/service/delete', Service.deleteOneService)

module.exports=Router