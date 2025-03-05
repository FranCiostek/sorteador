document.getElementById("sortearForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const dataInicio = new Date(document.getElementById("dataInicio").value + "T00:00:00");
    const numApresentacoes = parseInt(document.getElementById("numApresentacoes").value, 10);
    let nomes = document.getElementById("nomes").value.trim().split("\n").map(nome => nome.trim()).filter(nome => nome);

    if (nomes.length < numApresentacoes) {
        alert("O número de apresentações por dia não pode ser maior que a quantidade de nomes.");
        return;
    }

    const resultadoTextArea = document.getElementById("resultado");
    const resultadoContainer = document.getElementById("resultadoContainer");

    let resultadoTexto = "";
    let dataAtual = new Date(dataInicio);
    const umDia = 24 * 60 * 60 * 1000;
    const feriados = [
        "01/01", "21/04", "01/05", "07/09", "12/10", "02/11", "15/11", "25/12"
    ];

    while (nomes.length > 0) {
        const diaSemana = dataAtual.getDay();
        const dataFormatada = dataAtual.toLocaleDateString("pt-BR");
        const dataFeriado = dataFormatada.substring(0, 5);

        if (diaSemana !== 0 && diaSemana !== 6 && !feriados.includes(dataFeriado)) {
            for (let i = 1; i <= numApresentacoes && nomes.length > 0; i++) {
                const indiceSorteado = Math.floor(Math.random() * nomes.length);
                const nomeSorteado = nomes.splice(indiceSorteado, 1)[0];

                resultadoTexto += `${dataFormatada} - Apresentação ${i} - ${nomeSorteado}\n`;
            }
        }

        dataAtual = new Date(dataAtual.getTime() + umDia);
    }

    resultadoTextArea.value = resultadoTexto.trim();
    resultadoContainer.classList.remove("hidden");

    copiarParaClipboard();
});

document.getElementById("copiarBtn").addEventListener("click", copiarParaClipboard);

function copiarParaClipboard() {
    const resultadoTextArea = document.getElementById("resultado");
    navigator.clipboard.writeText(resultadoTextArea.value)
        .then(() => {
            Toastify({
                text: "Copiado para a área de transferência",
                duration: 3000,
                newWindow: false,
                close: false,
                gravity: "top",
                position: "right",
                stopOnFocus: false,
                style: {
                    background: "#F8C126",
                    color: "#F5F1EB",
                },
                onClick: function () { }
            }).showToast();
        })
        .catch(err => console.error("Erro ao copiar:", err));
}
