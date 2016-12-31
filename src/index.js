const assert = require('assert');
const crypto = require('crypto');
const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
assert.equal(charset.length, 26);
const length = parseInt(process.env.length || '16');
const string = crypto.randomBytes(length)
.map(value => charset.charCodeAt(Math.floor(value*charset.length/256)))
.toString();
if (process.env.lowercase) {
   console.log(string.toLowerCase());
} else {
   console.log(string);
}
