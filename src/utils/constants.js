require('dotenv').config();

exports.encryptionKeys = {
    syncEncryptor: {
        keyword: process.env.KEY,
        salt: process.env.SALT,
    },
    passwordSalt: process.env.PW_SALT,
}
