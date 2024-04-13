// routes/produtoRoutes.js

const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para buscar todos os produtos
router.get('/', produtoController.getAllProdutos);

// Rota para buscar um produto por ID
router.get('/:id', produtoController.getProdutoById);

// Rota para renderizar a página do produto com os detalhes e comentários
router.get('/produtos/:id/comentarios', produtoController.renderComentariosProduto);

// Rota para enviar avaliações
router.post('/:id/avaliacoes', produtoController.enviarAvaliacao);

// Rota para carregar os comentários de um produto específico
router.get('/:id/comentarios', produtoController.carregarComentarios);

router.post('/', produtoController.createProduto);

router.put('/:id', produtoController.updateProduct);

// Rota para excluir um produto
router.delete('/:id', produtoController.deleteProduct);
router.get('/:id/media-notas', produtoController.calcularMediaNotasProduto);

module.exports = router;
