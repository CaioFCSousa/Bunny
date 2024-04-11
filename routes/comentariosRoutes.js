// routes/comentariosRoutes.js

const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');

// Rota para listar todos os comentários
router.get('/', comentarioController.getAllComments);

// Rota para adicionar um novo comentário a um produto específico
router.post('/:produtoId/comentarios', comentarioController.addComment);

// Rota para atualizar um comentário existente
router.put('/:id', comentarioController.updateComment);

// Rota para excluir um comentário
router.delete('/:id', comentarioController.deleteComment);

module.exports = router;
