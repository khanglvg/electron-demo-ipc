const {ipcRenderer} = require('electron');

const content = document.getElementById("content-msg");
const sendMessageButton = document.getElementById("send-message");


ipcRenderer.on('message-from-main', (event, message) => {
	content.innerText = "Msg from R1: " + message
});

sendMessageButton.addEventListener('click', event => {
	const replyMsg = 'Hi R1.';
	ipcRenderer.send('reply-from-r2', replyMsg);
});
