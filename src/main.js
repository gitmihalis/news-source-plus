// Module to control application life.

// ************ Electron API ***************
const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const app = electron.app
const ipc = electron.ipcMain
const dialog = electron.dialog

// *************** Node API ****************
const path = require('path')
const url = require('url')


// *************** Vendor API **************
const mammoth = require('mammoth')




// *************** App *********************
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

let docx

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

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Once docx is opened, 
ipc.on('open:docx', event => {
  dialog.showOpenDialog(mainWindow, {
    defaultPath: app.getPath('downloads'),
    filters: [
      { name: "Docx Files", extensions: ['docx'] } 
    ],
    properties: ['openFile', 'multiSelections']
  }, filepaths => {
    if (filepaths) {
      // docx = filepaths[0]
      // event.sender.send('docx:display', docx)
      mammoth.convertToHtml({path: filepaths[0]})
        .then( html => {
          const escaped = escapeHtml(html.value)
          event.sender.send('docx:display', escaped)
        })
    }
  })
})

// Remove the special characters!
function escapeHtml(string) {
  return string
    .replace(/™/g, '&trade;')
    .replace(/À/g, '&Agrave;')
    .replace(/à/g, '&agrave;')
    .replace(/Â/g, '&Acirc;')
    .replace(/â/g, '&acirc;')
    .replace(/Æ/g, '&AElig;')
    .replace(/æ/g, '&aelig;')
    .replace(/Ç/g, '&Ccedil;')
    .replace(/ç/g, '&ccedil;')
    .replace(/È/g, '&Egrave;')
    .replace(/è/g, '&egrave;')
    .replace(/É/g, '&Eacute;')
    .replace(/é/g, '&eacute;')
    .replace(/Ê/g, '&Ecirc;')
    .replace(/ê/g, '&ecirc;')
    .replace(/Ë/g, '&Euml;')
    .replace(/ë/g, '&euml;')
    .replace(/Î/g, '&Icirc;')   
    .replace(/î/g, '&icirc;')
    .replace(/Ï/g, '&Iuml;')
    .replace(/ï/g, '&iuml;')
    .replace(/Ô/g, '&Ocirc;')
    .replace(/ô/g, '&ocirc;')
    .replace(/Œ/g, '&OElig;')
    .replace(/œ/g, '&oelig;')
    .replace(/Ù/g, '&Ugrave;')
    .replace(/ù/g, '&ugrave;')
    .replace(/Û/g, '&Ucirc;')
    .replace(/û/g, '&ucirc;')
    .replace(/Ü/g, '&Uuml;')
    .replace(/ü/g, '&uuml;')
    .replace(/«/g, '&laquo;')
    .replace(/»/g, '&raquo;')
    .replace(/€/g, '&euro;')
    .replace(/₣/g, '&#8355;')
    .replace(/¢/g, '&cent;')
    .replace(/©/g, '&copy;')
    .replace(/®/g, '&reg;')
    .replace(/™/g, '&trade;')
    .replace(/“/g, '&ldquo; ')
    .replace(/”/g, '&rdquo;')
    .replace(/•/g, '&bull;')    
    .replace(/–/g, '&ndash;')    
    .replace(/—/g, '&mdash;')    
    .replace(/‘/g, '&lsquo;')    
    .replace(/’/g, '&rsquo;') 
}