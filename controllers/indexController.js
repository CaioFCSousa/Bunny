// indexController.js

const Produto = require('../models/produtoModel'); // Importe o modelo do produto

// Função para obter dados para a página inicial
async function getIndexData(req, res) {
    try {
        // Aqui você busca os produtos do banco de dados, supondo que você tenha um modelo "Produto"
        const produtos = await Produto.find(); // Supondo que você esteja usando o Mongoose para interagir com o MongoDB
        res.render('index', { produtos }); // Passa os produtos para o template EJS
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados da página inicial');
    }
}

module.exports = {
    getIndexData
};
