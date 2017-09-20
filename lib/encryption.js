'use strict'

const crypto = require('crypto')
const algorithm = 'aes-256-ctr'
const password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY'

function encrypt (buffer) {
  let cipher = crypto.createCipher(algorithm, password)
  let crypted = Buffer.concat([cipher.update(buffer), cipher.final()])
  return crypted
}

function decrypt (buffer) {
  let decipher = crypto.createDecipher(algorithm, password)
  let dec = Buffer.concat([decipher.update(buffer), decipher.final()])
  return dec
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
}

 // let hw = encrypt(new Buffer("hello world", "utf8"))
 // console.log(decrypt(hw).toString('utf8'));
