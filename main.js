const electron = require('electron');
const { ipcMain } = require('electron');
const { app } = electron;
const { BrowserWindow } = electron;

const path = require('path');
const url = require('url');

let winOne;
let winTwo;

ipcMain.on('message-from-r1', (event, message) => {
  winTwo.webContents.send('message-from-main', message);
});

ipcMain.on('reply-from-r2', (event, reply) => {
  winOne.webContents.send('reply-from-main', `Reply from second window: ${reply}`);
});

function createWindow() {
  winOne = new BrowserWindow({ width: 800, height: 450 });
  winTwo = new BrowserWindow({ width: 800, height: 450 });

  winOne.loadURL(url.format({
    pathname: path.join(__dirname, 'renderer1.html'),
    protocol: 'file:',
    slashes: true
  }));

  winTwo.loadURL(path.join('file://', process.cwd(), 'renderer2.html'));

  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  winOne.setPosition(0, 0);

  //winTwo.setPosition(width / 2 - winTwo.getSize().width / 2, height / 2 - winTwo.getSize().height / 2);

  winOne.on('closed', function () {
    winOne = null
  });

  winTwo.on('close', () => {
    winTwo = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (winOne === null) {
    createWindow()
  }
});

