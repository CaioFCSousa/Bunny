// models/comentarioModel.js

const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true // Garante que o campo nome seja obrigatório
    },
    comentario: {
        type: String,
        required: true // Garante que o campo comentario seja obrigatório
    },
    nota: {
        type: Number,
        required: true // Garante que o campo nota seja obrigatório
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto' // Referência ao modelo de Produto
    }
    // Outros campos do esquema...
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
