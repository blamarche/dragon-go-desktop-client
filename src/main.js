const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const Config = require('electron-config')
const config = new Config()

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  let opts = {show: false}
  Object.assign(opts, config.get('winBounds'))
  mainWindow = new BrowserWindow(opts)
  mainWindow.setMenu(null);

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.once('ready-to-show', mainWindow.show)

  // Open the DevTools.
  electron.globalShortcut.register('Control+Shift+I', () => {
    mainWindow.webContents.openDevTools();
    electron.dialog.showMessageBox(
      {
        title: "Warning",
        message:"You've opened the debugging console. Please note this *breaks* the 'Your Move' notifications until you restart the app.",
        type: "warning",
        buttons: ["OK"]
      }
    );
  });
  
  // save window size and position
  mainWindow.on('close', () => {
    config.set('winBounds', mainWindow.getBounds())
  })
  
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
