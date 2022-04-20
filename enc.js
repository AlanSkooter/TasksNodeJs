const fs = require('fs')
const readline = require('readline')
const os = require('os')

const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
})

const defaultHandler = err => {
    if (err) {
        throw new Error(err)
    }
}

if (fs.existsSync('output.txt')) {
    fs.truncate('output.txt', 0, defaultHandler)
}

rl.on('line', (line) => {
    const data = Buffer.from(line).toString('hex') + os.EOL
    const options = { flag: 'a+' }
    fs.writeFileSync('output.txt', data, options, defaultHandler)
})
