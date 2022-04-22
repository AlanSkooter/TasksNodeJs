const fs = require('fs');
const readline = require('readline');
const os = require('os');
const { translate } = require('free-translate');

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
});

const enws = fs.createWriteStream('en.translate.txt');
const cnws = fs.createWriteStream('cn.translate.txt');

(async () => {
    for await (const line of rl) {
        const enTranslate = await translate(line, { from: 'ru', to: 'en' });
        enws.write(enTranslate  + os.EOL);
    }
})();

rl.on('line', async (line) => {
    const cnTranslate = await translate(line, { from: 'ru', to: 'zh-CN' });
    cnws.write(cnTranslate  + os.EOL);
  });
