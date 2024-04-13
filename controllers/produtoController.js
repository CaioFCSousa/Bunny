// controllers/produtoController.js

const Produto = require('../models/produtoModel');
const Comentario = require('../models/comentarioModel');

// Função para buscar todos os produtos
exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find().maxTimeMS(30000).exec(); // Usar exec() para executar a consulta
        res.json(produtos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
};

// Função para buscar um produto por ID
exports.getProdutoById = async (req, res) => {
    const produtoId = req.params.id;

    try {
        const produto = await Produto.findById(produtoId);

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }

        res.json(produto);
    } catch (error) {
        console.error('Erro ao buscar produto por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar produto por ID. Por favor, tente novamente mais tarde.' });
    }
};
// Função para renderizar a página do produto com os detalhes e comentários
exports.renderProductPage = async (req, res) => {
    try {
        const produtoId = req.params.id;
        const produto = await Produto.findById(produtoId);
        if (!produto) {
            res.status(404).send('Produto não encontrado');
            return;
        }
        const comentarios = await Comentario.find({ produto: produtoId }); // Buscar os comentários relacionados ao produto
        const mediaNotas = calcularMediaNotas(comentarios); // Calcular a média das no

        res.render('produto', { produto, comentarios, mediaNotas }); // Passar os comentários e a média das notas para o template EJS
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).send('Erro ao buscar produto');
    }
};
exports.calcularMediaNotasProduto = async (req, res) => {
    try {
        const produtoId = req.params.id;
        const comentarios = await Comentario.find({ produto: produtoId });
        const mediaNotas = calcularMediaNotas(comentarios);
        res.json({ mediaNotas });
    } catch (error) {
        console.error('Erro ao calcular média das notas:', error);
        res.status(500).json({ error: 'Erro ao calcular média das notas' });
    }
};
function calcularMediaNotas(comentarios) {
    if (comentarios.length === 0) {
        return 0; // Se não houver comentários, a média é 0
    }
    const totalNotas = comentarios.reduce((acc, comentario) => acc + comentario.nota, 0);
    return totalNotas / comentarios.length;
}
// Função para adicionar um comentário a um produto
exports.enviarAvaliacao = async (req, res) => {
    try {
        const { nome, comentario, nota } = req.body;
        const produtoId = req.params.id; // ID do produto

        // Verificar se o produto existe
        const produto = await Produto.findById(produtoId);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Criar um novo comentário associado ao produto correto
        const novoComentario = new Comentario({ nome, comentario, nota, produto: produtoId });
        await novoComentario.save();

        res.status(201).json({ message: 'Avaliação enviada com sucesso' });
    } catch (error) {
        console.error('Erro ao enviar avaliação:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};
// Função para carregar todos os comentários de um produto específico
exports.carregarComentarios = async (req, res) => {
    try {
        const produtoId = req.params.id;

        // Buscar o produto pelo ID
        const produto = await Produto.findById(produtoId);

        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }

        // Buscar os comentários associados ao produto
        const comentarios = await Comentario.find({ produto: produtoId });

        res.status(200).json(comentarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao carregar os comentários' });
    }
};
                

exports.createProduto = async (req, res) => {
    try {
        const { nome, descricao, imagem1, imagem2 } = req.body;
        const novoProduto = await Produto.create({ nome, descricao, imagem1, imagem2 });

        res.status(201).json(novoProduto);
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ error: 'Erro interno do servidor ao criar produto' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Verifique se 'id' é o nome correto do parâmetro
        const { nome, descricao, imagem1, imagem2 } = req.body;
        if (!id) {
            return res.status(400).json({ error: 'ID do produto não fornecido' });
        }
        const produtoAtualizado = await Produto.findByIdAndUpdate(id, { nome, descricao, imagem1, imagem2 }, { new: true });
        if (!produtoAtualizado) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(produtoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};

// Função para excluir um produto
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const produtoExcluido = await Produto.findByIdAndDelete(id);
        if (!produtoExcluido) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ error: 'Erro ao excluir produto' });
    }
};

exports.renderComentariosProduto = async (req, res) => {
    try {
        const produtoId = req.params.id;
        const produto = await Produto.findById(produtoId);
        if (!produto) {
            res.status(404).send('Produto não encontrado');
            return;
        }
        const comentarios = await Comentario.find({ produto: produtoId });
        res.render('product_comments', { produto, comentarios });
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).send('Erro ao buscar produto');
    }
};
