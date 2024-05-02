const electron = require("electron");
const NewsAPI = require("newsapi");

const { app, Menu, BrowserWindow, ipcMain } = electron;

let window;
app.on("ready", () => {
  window = new BrowserWindow({ webPreferences: { nodeIntegration: true } });
  window.loadFile("index.html");
});


const newsapi = new NewsAPI("11e68ee7d9d5468ea5bbbd1da62f7508");
try {
ipcMain.on("fetch-news", () => {
  newsapi.v2
    .everything({
      q: "bitcoin",
      sources: "bbc-news,the-verge",
      domains: "bbc.co.uk, techcrunch.com",
      from: "2017-12-01",
      to: "2017-12-12",
      language: "en",
      sortBy: "relevancy",
      page: 2,
    })
    .then((response) => {
      window.webContents.send("news-data", response);
      console.log(response);
      console.log('ok');
    });
});
} catch (error) {
    console.log(error);
}