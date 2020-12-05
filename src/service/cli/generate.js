'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {readFile, callError, generatePublications} = require(`../utils/_utils`);
const {DEFAULT_COUNT, MAX_PUBLICATIONS_COUNT} = require(`../utils/_constants`);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = count > MAX_PUBLICATIONS_COUNT ?
      callError(`Не больше 1000 публикаций`) :
      parseInt(count, 10) || DEFAULT_COUNT;
    const titles = await readFile(`./data/titles.txt`);
    const categories = await readFile(`./data/categories.txt`);
    const sentences = await readFile(`./data/sentences.txt`);
    const comments = await readFile(`./data/comments.txt`);

    const content = JSON.stringify(generatePublications(countOffer, titles, categories, sentences, comments));

    try {
      await fs.writeFile(`mocks.json`, content);
      return console.info(chalk.green(`Operation success. File created.`));
    } catch (error) {
      return callError(`Can't write data to file...`);
    }
  }
};
