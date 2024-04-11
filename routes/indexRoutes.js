// routes/indexRoutes.js

const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');
const produtoController = require('../controllers/produtoController');


// Rota para a página inicial
router.get('/', indexController.getIndexData);
router.get('/produto/:id', produtoController.renderProductPage);

module.exports = router;
