// preload.js

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendToMain: (message) => {
        ipcRenderer.send('messageTomain', message); // Envia a mensagem para o main process
    },
    requestData: () => ipcRenderer.send('requestData'), // Solicita dados
    onResponseData: (callback) => ipcRenderer.on('responseData', callback), // Recebe dados
});
