require('dotenv').config();
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const inputURLS = process.env.INPUT_URLS.split(',');
const outputDirAudio = process.argv[2];

const convert = (input, output) => {
    ffmpeg(input)
        .noVideo()
        .format('mp3')
        .on('end', function() {
            console.log('Processing finished!');
        })
        .save(output);
  };

(async () => {
    await inputURLS.forEach((url) => {
        const outputAudioPath = path.resolve(outputDirAudio + 'audio' + `${Math.floor(Math.random()*100)}` + '.mp3');
        convert(ytdl(url), fs.createWriteStream(outputAudioPath));
    });
})();
