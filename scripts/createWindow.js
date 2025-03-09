const { BrowserWindow } = require("electron");
const path = require("path");


// Certifique-se de ajustar o caminho para subir um diretório
const preloadPath = path.join(__dirname, "../preload.js");


function createWindow() {
	let mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false, // Desative a integração direta com o Node.js no contexto da página
			contextIsolation: true, // Habilite o isolamento de contexto
			preload: preloadPath,
		},
	});
	
	mainWindow.loadFile("index.html");
	// Abre o DevTools automaticamente
	// mainWindow.webContents.openDevTools();

	mainWindow.on("closed", function () {
		mainWindow = null;
	});
}

module.exports = createWindow;
