const process = require('process');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const fsExtra = require('fs-extra');

const size = process.argv[2];
const inputDir = process.argv[3];
const outputDir = process.argv[4];

fsExtra.emptyDirSync(outputDir);

const width = +size.split('x')[0];
const height = +size.split('x')[1];
let images = [];

const files = fs.readdirSync(inputDir);

files.forEach((file) => {
    const ext = file.split('.')[1];
    if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'gif' || ext == 'webp') {
        images.push(file);
    }
})

images.forEach((imageName) => {
    const targetIn = path.resolve(inputDir, imageName);
    const image = fs.readFileSync(targetIn);
    const targetOut = path.resolve(outputDir, imageName);
    sharp(image)
    .resize(width, height)
    .toFile(targetOut, (err, info) => {
        console.log(err, info);
     });
})