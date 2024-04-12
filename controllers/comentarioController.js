// Importar o modelo de Comentário definido pelo Mongoose
const Comentario = require('../models/comentarioModel');

// Função para listar todos os comentários
exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find().maxTimeMS(30000).exec(); // Usar exec() para executar a consulta
        res.json(produtos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
};

// Função para adicionar um novo comentário
async function addComment(req, res) {
    // Extrair os dados do comentário do corpo da requisição
    const { nome, comentario, nota, produtoId } = req.body;
    
    try {
        // Criar um novo documento de Comentário no banco de dados
        const novoComentario = await Comentario.create({ nome, comentario, nota, produto: produtoId });
        res.status(201).json(novoComentario); // Responder com o novo comentário criado
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao adicionar comentário' });
    }
}

// Função para atualizar um comentário existente
async function updateComment(req, res) {
    const { id } = req.params;
    const { texto } = req.body;
    try {
        // Encontrar e atualizar o comentário no banco de dados
        const comentarioAtualizado = await Comentario.findByIdAndUpdate(id, { texto }, { new: true });
        if (!comentarioAtualizado) {
            return res.status(404).json({ error: 'Comentário não encontrado' });
        }
        res.json(comentarioAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar comentário no banco de dados' });
    }
}

// Função para excluir um comentário
async function deleteComment(req, res) {
    const { id } = req.params;
    try {
        const comentarioExcluido = await Comentario.findByIdAndDelete(id);
        if (!comentarioExcluido) {
            return res.status(404).json({ error: 'Comentário não encontrado' });
        }
        res.json({ message: 'Comentário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir comentário:', error);
        res.status(500).json({ error: 'Erro ao excluir comentário do banco de dados' });
    }
}


// Exportar as funções do controlador de comentários
module.exports = {
    getAllComments,
    addComment,
    updateComment,
    deleteComment
};
