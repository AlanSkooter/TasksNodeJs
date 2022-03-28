const os = require('os');
const fs = require('fs');

const enter = os.EOL;
const myOs = os.arch();
const user = os.userInfo().username;
const numberCore = os.cpus().length;
const freeMemory = os.freemem() / 1024 / 1024;
const infoCore = os.cpus();
const version = os.version();
let hzCore;

infoCore.forEach((elem) => {
    hzCore = elem.model.split('@')[1];
});

fs.writeFileSync('./info.txt', myOs + enter + user + enter + numberCore + enter + freeMemory + enter + hzCore.trim() + enter + version, (err) => {
    if(err) throw err;
});