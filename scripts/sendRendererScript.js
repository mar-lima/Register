// Função para enviar o pedido de dados ao main process
function fetchData() {
    window.electronAPI.requestData(); // Envia o pedido para o main process
}

// Receber os dados do main process e atualizar a tabela
window.electronAPI.onResponseData((event, data) => {
    console.log('Dados recebidos do main process:', data);

    // Limpar a tabela antes de adicionar novos dados
    const tableBody = document.querySelector('#tableBody');
    tableBody.innerHTML = '';

    // Adicionar os dados na tabela
    data.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.total}</td>
        `;
        tableBody.appendChild(row);
    });
});

// Quando a página estiver carregada, busque os dados
document.addEventListener('DOMContentLoaded', fetchData);
