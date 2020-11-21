'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const getRandomArrayLength = (someArray, limit) => {
  const shuffledArray = shuffle(someArray);

  return shuffledArray
    .slice(0, getRandomInt(1, limit || shuffledArray.length));
};

const readFile = async (path) => {
  try {
    const readedFile = await fs.readFile(path, `utf-8`);
    return readedFile.split(`\n`);
  } catch (error) {
    console.error(chalk.red(error));
    return [];
  }
};

module.exports = {
  shuffle,
  getRandomInt,
  getRandomArrayLength,
  readFile
};
