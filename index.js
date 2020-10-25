const fs = require('fs');
const uuid = require('uuid').v4;
const sh = require('shelljs');
const json = JSON;


const config = json.parse(fs.readFileSync('config.json'));
const dir = config.taggerDirectory;

// sh.ln('--', 'test/testfile', dir+uuid());

for (let item of sh.ls(dir)) {
  console.log(item);
}