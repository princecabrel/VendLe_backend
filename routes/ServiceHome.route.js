const express = require('express');
const { router } = require('..');
const Router =express.Router();
const {serviceHome,topService,servicePeerUser,serviceCategoryPeerUser} = require('../controllers/ServiceHome.controller')

Router.get('/service/bycategory', serviceHome)
Router.get('/topservice',topService)
Router.get('/service/servicePeerUser',servicePeerUser)
Router.get('/service/serviceCategoryPeerUser',serviceCategoryPeerUser)



module.exports = Router