const electronReload = require('electron-reload'); // Adicione esta linha
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const createWindow = require('./scripts/createWindow.js');
const entryData = require('./scripts/entryRenderer.js');
const sendDataToRenderer = require('./scripts/sendRenderer.js');

// Configuração do electron-reload
electronReload(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'), // Caminho para o executável do Electron
    hardResetMethod: 'exit', // Método de reinicialização (exit/restart)
});

app.whenReady().then(() => {
    createWindow();
    entryData()
    sendDataToRenderer()
});

//=====================================================
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
