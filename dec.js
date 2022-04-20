const fs = require('fs')
const readline = require('readline')
const os = require('os')

const rl = readline.createInterface({
    input: fs.createReadStream('output.txt'),
    crlfDelay: Infinity
})

const defaultHandler = err => {
    if (err) {
        throw new Error(err)
    }
}

if (fs.existsSync('decode.txt')) {
    fs.truncate('decode.txt', 0, defaultHandler)
}

rl.on('line', (line) => {
    const decode = Buffer.from(line, 'hex').toString('utf-8') + os.EOL
    const options = { flag: 'a+' }
    fs.writeFileSync('decode.txt', decode, options, defaultHandler)
})
