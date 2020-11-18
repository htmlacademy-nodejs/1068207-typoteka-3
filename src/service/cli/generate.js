'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {getRandomInt, getRandomArrayLength, readFile} = require(`../utils/_utils`);
const {ExitCode} = require(`../utils/_constants`);

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DATE_OBJECT = new Date();
const CURRENT_MONTH = DATE_OBJECT.getMonth();
const CURRENT_YEAR = DATE_OBJECT.getFullYear();
const DATES_PERIOD = 2;
const MAX_PUBLICATIONS_COUNT = 1000;
const MAX_ANNOUNCE_SENTENCES_COUNT = 5;

const generateDates = () => {
  const start = CURRENT_MONTH - DATES_PERIOD;
  let result = [];

  for (let i = 0; i < DATES_PERIOD; i++) {
    const randomMonth = getRandomInt(start, CURRENT_MONTH);

    const createdDate = new Date(
        CURRENT_YEAR,
        randomMonth,
        getRandomInt(1, 30),
        getRandomInt(0, 24),
        getRandomInt(0, 59),
        getRandomInt(0, 59)
    ).toJSON().slice(0, 19).replace(`T`, ` `);

    result.push(createdDate);
  }

  return result;
};

const DATES = generateDates();


const generatePublications = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: DATES[getRandomInt(0, DATES.length - 1)],
    category: getRandomArrayLength(categories),
    announce: getRandomArrayLength(sentences, MAX_ANNOUNCE_SENTENCES_COUNT),
    fullText: getRandomArrayLength(sentences)
  }))
);

const callError = (errorMessage) => {
  console.error(chalk.red(`${errorMessage}`));
  return process.exit(ExitCode.error);
};

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

    const content = JSON.stringify(generatePublications(countOffer, titles, categories, sentences));

    try {
      await fs.writeFile(FILE_NAME, content);
      return console.info(chalk.green(`Operation success. File created.`));
    } catch (error) {
      return callError(`Can't write data to file...`);
    }
  }
};
