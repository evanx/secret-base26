# secret-base26

Randomly generate a secret token using case-insensitive alpha charset.

This is suitable for secret URLs, whereas base64 includes slash in its charset.

Also see related project for base56 which uses uppercase, lowercase and digits: https://github.com/evanx/secret-base56

Also base32 which in case-insensitive: https://github.com/evanx/secret-base32

However case-insensitive alpha only, is convenient where secrets need to be entered using a mobile keyboard.

It is implemented as follows:
```javascript
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
```
where we generate an array of random bytes (values 0 to 255 inclusive) of the desired `length` and then map each into our charset i.e. the latin alphabet.

We can build using its `Dockerfile` as follows:
```
docker build -t secret-base26:test https://github.com/evanx/secret-base26.git
```
where we tag the image so we can run by tag name:
```
docker run -t secret-base26:test 
```
which we repeat to confirm that it gives us random output.

Use `length` envar to change from default `16`
```
docker run -e length=40 lowercase=true secret-base26:test
```
which outputs length `40` token in lowercase e.g. ``

## Related 

See the following related project which is case-sensitive base56.

https://github.com/evanx/secret-base56

Base56 is worse for hand-written backups since some letters have similar shapes in lowercase e.g. c, s, u, v

However for ephemeral secret URLs where hand-written backups are not useful, then base56 is better as shorter strings can encode larger numbers.


