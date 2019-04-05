const { ipcRenderer } = require('electron');
const openSecondWindowButton = document.getElementById('open-second-window');
const content = document.getElementById('msg-back');

openSecondWindowButton.addEventListener('click', (event) => {
  ipcRenderer.send('message-from-r1', 'Hello R2 from R1.');
});

ipcRenderer.on('reply-from-main', (event, reply) => {
  content.innerText = reply;
});