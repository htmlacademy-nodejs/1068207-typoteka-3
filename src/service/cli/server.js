'use strict';

const express = require(`express`);
const articlesRouter = require(`../routes/offers`);

const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;

    const port = Number(parseInt(customPort, 10)) || DEFAULT_PORT;
    const app = express();
    app.use(express.json());
    app.use(`/articles`, articlesRouter);

    app.get(`/`, async (req, res) => {
      return res.send(`Hello, Api Service!`);
    });

    app.listen(port, () => console.log(`Server has been started at ${port}`));
  }
};
