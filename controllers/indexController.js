const axios = require('axios');
const Produto = require('../models/produtoModel'); // Importe o modelo do produto

// Função para obter dados para a página inicial
async function getIndexData(req, res) {
    try {
        // Aqui você faz uma requisição GET para uma API externa
        const response = await axios.get('https://api.example.com/produtos');
        const produtos = response.data; // Supondo que a resposta da API seja um array de produtos

        // Aqui você também pode buscar produtos do banco de dados, se necessário
        // const produtos = await Produto.find(); // Supondo que você esteja usando o Mongoose para interagir com o MongoDB
        
        res.render('index', { produtos }); // Passa os produtos para o template EJS
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar dados da página inicial');
    }
}

module.exports = {
    getIndexData
};
