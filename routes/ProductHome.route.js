const express = require('express');
const { router } = require('..');
const { articleHome , articleFavorites , topArticles, productCategoryPeerUser, productPeerUser} = require('../controllers/ArticleHome.controller');
const Router =express.Router();

Router.get('/article/bycategory', articleHome)
Router.get('/toparticle', topArticles)
Router.get('/article/test/:id', productPeerUser )
Router.get('/article/test1/:id', productCategoryPeerUser)

module.exports = Router