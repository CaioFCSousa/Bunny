let estadoAnterior = {}; // Objeto para armazenar o estado anterior de cada imagem

document.addEventListener("click", (e) => {
    if (e.target.className == 'imagem_avaliacao') {
        let valorNota = notaAvaliacao(e.target.id);
        mudarImagem(valorNota);
    }
});

function notaAvaliacao(id) {
    let originalString = id;
    let numero = originalString.replace(/^img_(\d+)$/, "$1");
    return numero;
}

function mudarImagem(nota) {
    // Remover avaliações anteriores
    for (let i = 1; i <= 5; i++) {
        let imagem = document.getElementById(`img_${i}`);
        if (i <= nota) {
            imagem.setAttribute('src', 'assets/img/avaliacao1.png');
        } else {
            imagem.setAttribute('src', 'assets/img/semAvaliacao.png');
        }
    }
}
