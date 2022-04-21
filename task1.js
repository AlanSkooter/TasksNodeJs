require('dotenv').config();
const process = require('process');
const path = require('path');
const { createGzip } = require('zlib');
const { pipeline } = require('stream');
const {
  createReadStream,
  createWriteStream
} = require('fs');

const inputDir = process.env.INPUT_PATH;
const outputDir = process.env.OUTPUT_PATH;

const gzip = createGzip();
const source = createReadStream(path.resolve(inputDir));
const destination = createWriteStream(path.resolve(outputDir, path.parse(inputDir).base) + '.zip');

pipeline(source, gzip, destination, (err) => {
  if (err) {
    console.error('An error occurred:', err);
    process.exitCode = 1;
  }
});