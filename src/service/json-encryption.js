const { encryptionKeys } = require("../utils/constants");
const createEncriptor = require("../utils/sync_enc");

const encryptor = createEncriptor(encryptionKeys.syncEncryptor.keyword, encryptionKeys.syncEncryptor.salt)

exports.encrypt = (obj) => {
    if (typeof obj !== 'object') {
        throw new Error('JSON encrypt arguments should be an object!')
    }

    return encryptor.encrypt(JSON.stringify(obj))
}

exports.decrypt = (str) => {
    if (typeof str !== 'string') {
        throw new Error('JSON decrypt arguments should be a string!')
    }

    return JSON.parse(encryptor.decrypt(str))
}