const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const { connectDatabase } = require("./database");
const { pre } = require("framer-motion/client");

function createWindow() {
    Menu.setApplicationMenu(null);

    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: false,
            contextIsolation: true,
        }
    });

    window.loadURL("http://localhost:5173");
}

ipcMain.handle("activities:getAll", async () => {
    const result = await client.query(`
        SELECT *
        FROM activities
        ORDER BY id;
        `);

    return result.rows;
});

app.whenReady().then(async () => {
    await connectDatabase();
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