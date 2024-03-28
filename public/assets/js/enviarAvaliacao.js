document.addEventListener("DOMContentLoaded", function() {
    // Função para enviar os dados para o backend
    function enviarDados() {
        // Obter os valores dos campos
        var comentario = document.getElementById("Comtentario").value;
        var nome = document.querySelector("#input-nome input[type='text']").value;

        // Verificar se os campos estão preenchidos
        if (comentario.trim() === '' || nome.trim() === '') {
            alert("Por favor, preencha todos os campos.");
            return; // Impede o envio dos dados se algum campo estiver vazio
        }

        // Aqui você pode enviar os dados para o backend usando fetch() ou outra técnica
        // Exemplo de como enviar os dados usando fetch():
        /*
        fetch('URL_DO_BACKEND', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comentario: comentario,
                nome: nome
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Lógica após o envio bem-sucedido (se necessário)
            console.log(data);
        })
        .catch((error) => {
            console.error('Erro ao enviar os dados:', error);
        });
        */

        // Simulação de sucesso (remova isso ao usar a chamada fetch() real)
        alert("Dados enviados com sucesso!");
    }

    // Adicionar evento de clique ao botão "Enviar"
    var btnEnviar = document.querySelector(".btn_enviar");
    btnEnviar.addEventListener("click", enviarDados);
});