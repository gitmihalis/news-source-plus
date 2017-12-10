// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron')
const ipc = electron.ipcRenderer
const clipboard = electron.clipboard
const minify = require('html-minifier').minify

const outputEl = document.getElementById('output')
const minifyBtn = document.getElementById('minify')
const saveBtn = document.getElementById('save')
const copyBtn = document.getElementById('copy-html')
const openBtn = document.getElementById('open-docx')
const collapseBtn = document.getElementById('arrow')

let htmlString = ''

minifyBtn.addEventListener('click', e => {
  const currentOut = outputEl.innerText
  let newOut = minify(currentOut, {
    removeComments: true,
    removeStyleLinkTypeAttributes: true,
    collapseWhitespace: true,
  })
  htmlString = newOut
  outputEl.innerText = newOut
})

saveBtn.addEventListener('click', e => {
  ipc.send('save:html', htmlString)
})

openBtn.addEventListener('click', e => {
  ipc.send('open:docx')
})

copyBtn.addEventListener('click', e => {
  if(htmlString.length > 0) {
    clipboard.writeText(htmlString)
    outputEl.classList.add('copied')
    setTimeout(() => {
      outputEl.classList.remove('copied')
    }, 500);
  }
})


// Render parsed HTML from docx
ipc.on('docx:display', (event, html) => {
  htmlString = html
  outputEl.innerText = html
})

ipc.on('save:success', (event, filename) => {
  alert(`Html was saved!`)
})

ipc.on('save:error', _ => {
  alert('Html failed to save!')
})




