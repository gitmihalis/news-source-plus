// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById('open-docx').addEventListener('click', e => {
  ipc.send('open:docx')
})

// Render parsed HTML from docx
ipc.on('docx:display', (evt, html) => {
  document.getElementById('output').innerText = html
})



