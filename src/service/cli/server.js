'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const PORT = 3000;
const MOCK_FILE = `mocks.json`;
const {HttpCode} = require(`../utils/_constants`);

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const handleClientConntection = async (req, res) => {
  switch (req.url) {
    case `/`:
      try {
        const rawJson = await fs.readFile(MOCK_FILE);
        const publications = JSON.parse(rawJson)
          .map((publication) => `<li>${publication.title}</li>`)
          .join(``);
        return sendResponse(res, HttpCode.OK, publications);
      } catch (error) {
        console.log(chalk.red(error));
        return sendResponse(res, HttpCode.NOT_FOUND, `Not Found`);
      }
    default: return sendResponse(res, HttpCode.NOT_FOUND, `Упс, такой страницы нет, 404`);
  }
};

const handleServerConnection = (error, port) => {
  if (error) {
    return console.error(chalk.red(`Ошибка при создании сервера, ${error}`));
  }

  return console.info(chalk.green(`Ожидаю соединений на ${port}`));
};


module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;

    const port = parseInt(customPort, 10) || PORT;

    http
      .createServer(handleClientConntection)
      .listen(port)
      .on(`listening`, (error) => handleServerConnection(error, port));
  }
};
