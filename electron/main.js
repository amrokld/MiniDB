const { app, BrowserWindow, Menu } = require("electron");

function createWindow() {
    Menu.setApplicationMenu(null);

    const window = new BrowserWindow({
        width: 1200,
        height: 800,
    });

    window.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});