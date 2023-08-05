const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Chú ý đến cờ này để cho phép sử dụng Node.js trong trang web
    },
  });

  // Sử dụng đường dẫn tới file index.html của ứng dụng React
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../tfx-app/build/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Đóng cửa sổ khi ứng dụng bị đóng
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

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