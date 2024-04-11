// controllers/utils.js

function calcularMediaNotas(comentarios) {
    if (comentarios.length === 0) {
        return 0; // Se não houver comentários, a média é 0
    }
    const totalNotas = comentarios.reduce((acc, comentario) => acc + comentario.nota, 0);
    return totalNotas / comentarios.length;
}

module.exports = calcularMediaNotas;
