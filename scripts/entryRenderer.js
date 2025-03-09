const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

function entryData() {
    const dataFolderPath = path.join(__dirname, '..', 'data'); // Pasta de dados
    const dataFilePath = path.join(dataFolderPath, 'data.json'); // Caminho para o arquivo data.json

    // Função para garantir que a pasta exista
    const ensureDataFolderExists = () => {
        if (!fs.existsSync(dataFolderPath)) {
            fs.mkdirSync(dataFolderPath, { recursive: true }); // Criar a pasta "data" se não existir
            console.log('Pasta de dados criada:', dataFolderPath);
        }
    };

    // Função para garantir que o arquivo data.json exista
    const ensureDataFileExists = () => {
        if (!fs.existsSync(dataFilePath)) {
            // Se o arquivo não existir, cria um arquivo vazio
            fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
            console.log('Arquivo data.json criado:', dataFilePath);
        }
    };

    // Chama as funções para garantir que a pasta e o arquivo existam
    ensureDataFolderExists();
    ensureDataFileExists();

    // Lidar com a mensagem do renderer
    ipcMain.on('messageTomain', async (event, message) => {
        console.log('Mensagem recebida do renderer:', message);

        // Verifique se a mensagem contém as chaves esperadas
        if (
            !message.idValue ||
            !message.nameValue ||
            !message.priceValue ||
            !message.quantValue
        ) {
            console.error('Mensagem não contém as chaves esperadas:', message);
            return;
        }

        const { idValue, nameValue, priceValue, quantValue } = message;

        // Garantir que os valores sejam números
        const priceNum = parseFloat(priceValue) || 0;
        const quantNum = parseInt(quantValue) || 0;
        const totalValue = (priceNum * quantNum).toFixed(2);

        // Criar o item a ser salvo
        const newItem = {
            id: idValue,
            name: nameValue,
            price: priceNum,
            quantity: quantNum,
            total: totalValue,
        };

        try {
            // Ler o arquivo para adicionar ou editar itens
            const data = await fs.promises.readFile(dataFilePath, 'utf8');
            let jsonData = [];
            try {
                jsonData = JSON.parse(data);
                console.log('Dados lidos do arquivo:', jsonData);
            } catch (e) {
                console.error('Erro ao parsear JSON no arquivo data.json:', e);
                jsonData = []; // Se o arquivo estiver vazio ou com erro, inicializa com um array vazio
            }

            // Verifica se já existe um item com o mesmo ID
            const itemIndex = jsonData.findIndex((item) => item.id === idValue);

            if (itemIndex !== -1) {
                // Se o item já existir, apenas atualiza os dados
                jsonData[itemIndex] = newItem;
                console.log('Item editado:', newItem);
            } else {
                // Se não existir, adiciona um novo item
                jsonData.push(newItem);
                console.log('Novo item adicionado:', newItem);
            }

            // Escrever os dados atualizados no arquivo
            const updatedJsonData = JSON.stringify(jsonData, null, 2);
            await fs.promises.writeFile(dataFilePath, updatedJsonData);
            console.log('Dados salvos com sucesso no data.json');
        } catch (err) {
            console.error('Erro ao ler ou escrever o arquivo data.json:', err);
        }
    });
}

module.exports = entryData;
