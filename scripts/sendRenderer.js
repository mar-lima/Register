//sendRenderer.js

const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

// Caminho para o arquivo data.json
const dataFilePath = path.join(__dirname, '..', 'data', 'data.json');

// Função para enviar os dados para o renderer
function sendDataToRenderer() {
    ipcMain.on('requestData', (event) => {
        // Ler o arquivo data.json
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo data.json:', err);
                event.reply('responseData', []); // Enviar um array vazio em caso de erro
                return;
            }

            let jsonData = [];
            try {
                jsonData = JSON.parse(data); // Parse dos dados para JSON
            } catch (e) {
                console.error('Erro ao parsear o arquivo JSON:', e);
                event.reply('responseData', []); // Enviar um array vazio em caso de erro
                return;
            }

            // Enviar os dados lidos para o renderer através de ipcRenderer
            event.reply('responseData', jsonData);
        });
    });
}

module.exports = sendDataToRenderer;
