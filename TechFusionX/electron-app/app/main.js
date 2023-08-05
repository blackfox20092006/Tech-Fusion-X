const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

let mainWindow;
let loadingWindow;

function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 300,
    height: 200,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  loadingWindow.loadFile(path.join(__dirname, './loading/index.html'));

  loadingWindow.once('ready-to-show', () => {
    loadingWindow.show();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  // mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../my-app/build/index.html')}`);
  mainWindow.loadURL('http://localhost:3000');

  mainWindow.webContents.once('dom-ready', () => {
    mainWindow.show();
    loadingWindow.close();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('did-fail-load', (_, errorCode, errorDescription) => {
    loadingWindow.close()
    await
    if (errorCode === -102) {
      dialog.showMessageBoxSync({
        type: 'error',
        title: errorDescription,
        message: 'Lỗi kết nối server, vui lòng kiểm tra lại'
      })
      app.quit()
    }
    if (errorCode === -6) {
      dialog.showMessageBoxSync({
        type: 'error',
        title: errorDescription,
        message: 'Không tìm thấy file, vui lòng kiểm tra lại'
      })
    }
  });
}

app.on('ready', () => {
  createLoadingWindow();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});