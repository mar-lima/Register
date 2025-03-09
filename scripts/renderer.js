let btn = document.querySelector('.btn-send');
let name = document.querySelector('#name');
let price = document.querySelector('#price');
let quant = document.querySelector('#quant');
let idInput = document.querySelector('#id'); // Campo do ID
let tableBody = document.querySelector('#tableBody');

let editingRow = null; // Variável para saber se estamos editando uma linha

// Função para adicionar ou editar dados na tabela
function addToTable() {
    // Garantir que o ID seja numérico
    let idValue = parseInt(idInput.value) || generateId(); // Converte para número ou gera novo ID
    let nameValue = name.value;
    let priceValue = price.value;
    let quantValue = quant.value;

    if (nameValue && priceValue && quantValue) {
        let totalValue = parseFloat(priceValue) * parseInt(quantValue);

        // Se estamos editando uma linha
        if (editingRow) {
            // Atualizar os valores da linha existente
            editingRow.children[1].textContent = nameValue;
            editingRow.children[2].textContent =
                parseFloat(priceValue).toFixed(2);
            editingRow.children[3].textContent = quantValue;
            editingRow.children[4].textContent = totalValue.toFixed(2);

            // Limpar a variável de edição
            editingRow = null;
        } else {
            // Caso contrário, criar uma nova linha
            let newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${idValue}</td>
                <td>${nameValue}</td>
                <td>${parseFloat(priceValue).toFixed(2)}</td>
                <td>${quantValue}</td>
                <td>${totalValue.toFixed(2)}</td>
            `;

            // Adicionar a nova linha ao corpo da tabela
            tableBody.appendChild(newRow);
        }

        // Limpar os campos de input
        name.value = '';
        price.value = '';
        quant.value = '';
        idInput.value = ''; // Limpar o campo de id

        // Envia dados para o main process
        window.electronAPI.sendToMain({
            idValue,
            nameValue,
            priceValue,
            quantValue,
        });
    } else {
        // alert('Preencha todos os campos antes de adicionar.');
    }
}

// Função para gerar um ID aleatório único
function generateId() {
    return Math.floor(Math.random() * 10000); // Gera um ID aleatório único
}

// Adicionar evento de clique na tabela para preencher os inputs e editar
tableBody.addEventListener('click', (e) => {
    let row = e.target.closest('tr'); // Encontra a linha clicada

    if (row) {
        // Preenche os campos com os valores da linha selecionada
        name.value = row.children[1].textContent;
        price.value = row.children[2].textContent;
        quant.value = row.children[3].textContent;
        idInput.value = row.children[0].textContent; // Preenche o campo de id invisível

        // Guarda a linha sendo editada
        editingRow = row;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Adicionar evento de clique para o botão de cadastro
    btn.addEventListener('click', () => {
        addToTable();
    });

    //limpar inputs

    const delForm = document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete') {
            // Limpar todos os campos de input
            name.value = '';
            price.value = '';
            quant.value = '';
            idInput.value = ''; // Limpar o campo de id
            editingRow = null; // Resetar a edição
        }
    });

    // Adicionar evento de pressionamento de tecla "Enter" para cadastro
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addToTable();
            delForm();
        }
    });
});
