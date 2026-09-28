const { contextBridge, ipcRender } = require("electron");

contextBridge.exposeInMainWorld("api", {
    getActivities: () => ipcRender.invoke("activities:getAll"),
});