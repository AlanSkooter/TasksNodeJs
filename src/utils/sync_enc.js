const crypto = require('crypto')

// High order function
// Функция высшего порядка
module.exports = (keyword, salt) => {
    const algorithm = 'aes-192-cbc'
    const key = crypto.scryptSync(keyword, salt, 24)

    return {
        decrypt(encrypted) {
            const decipher = crypto.createDecipheriv(algorithm, key, Buffer.alloc(16, 0))
            return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8')
        },
        encrypt(text) {
            const cipher = crypto.createCipheriv(algorithm, key, Buffer.alloc(16, 0))
            return cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
        }
    }
}
