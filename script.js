// O JavaScript "escuta" quando o botão Enviar (submit) é clicado
document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede a página de recarregar e perder os dados

    // 1. Encaixa e captura o nome e a data digitados
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;

    // 2. Gabarito oficial das perguntas de Front-end
    const gabarito = {
        q1: 'A', q2: 'C', q3: 'B', q4: 'C', q5: 'B',
        q6: 'B', q7: 'C', q8: 'B', q9: 'C', q10: 'B'
    };

    let acertos = 0;
    let erros = 0;
    let detalhesQuestoes = '';

    // 3. Processa e calcula os acertos e erros
    for (let i = 1; i <= 10; i++) {
        const respostaSelecionada = document.querySelector(`input[name="q${i}"]:checked`).value;
        const correta = gabarito[`q${i}`];

        if (respostaSelecionada === correta) {
            acertos++;
            detalhesQuestoes += `Questão ${i}: Acertou (Respondeu ${respostaSelecionada})\n`;
        } else {
            erros++;
            detalhesQuestoes += `Questão ${i}: Errou (Respondeu ${respostaSelecionada}, Correta: ${correta})\n`;
        }
    }

    // 4. Monta o texto do arquivo .txt
    const conteudoTxt = `RELATÓRIO DE RESPOSTAS (FRONT-END)\n` +
                        `=================================\n` +
                        `Usuário: ${nome}\n` +
                        `Data: ${data}\n` +
                        `=================================\n` +
                        `Total de Acertos: ${acertos}\n` +
                        `Total de Erros: ${erros}\n` +
                        `=================================\n` +
                        `DETALHES:\n${detalhesQuestoes}`;

    // 5. Cria o arquivo temporário e faz o download automático
    const blob = new Blob([conteudoTxt], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `respostas_${nome.replace(/\s+/g, '_')}.txt`;
    link.click();
});

    