// main.js

// Modules to control application life and create native browser window
const { error } = require('console');
const { app, BrowserWindow, dialog } = require('electron')
const path = require('path')

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile('index.html')

  mainWindow.webContents.on('did-fail-load', (_, errorCode) => {
    if (errorCode === -6) {
        const errorConnect = dialog.showMessageBoxSync({
            type: 'error',
            title: 'Loi ket noi',
            message: 'Loi ket noi toi co so du lieu, vui long kiem tra lai server',
        })
        if (errorConnect === 0) {
            app.quit()
        }
    }
  })
  // mainWindow.webContents.openDevTools()
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.