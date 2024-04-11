// models/produtoModel.js

const mongoose = require('mongoose');


const produtoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    imagem1: { type: String, required: true },
    imagem2: { type: String, required: true },
    // Outros campos, se necessário
});


module.exports = mongoose.model('Produto', produtoSchema);

