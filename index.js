const fs = require('fs');
const uuid = require('uuid').v4;
const sh = require('shelljs');
const json = JSON;
const walk = require('walk');

const isMp3 = function(filepath) {
  return filepath.substring(filepath.length-3, filepath.length) === 'mp3';
}

const hasGuid = function(filepath) {
  return true;
}

const linkExists = function(filepath) {
  return true;
}


const config = json.parse(fs.readFileSync('config.json'));
const dir = config.taggerDirectory;
const options = {
  // followLinks: false,
  filters: ["Temp", "_Temp"]
};

console.log(dir);

const walker = walk.walk(dir, options);

// walker.on("name", (root, nodeNamesArray) => {
// });

walker.on("file", (root, fileStats, next) => {
  console.log(root+fileStats.name);
  console.log(isMp3(fileStats.name));
  next();

  // file is an mp3?
    // continue
  // check for guid tag
      // no guid tag? add one
  // check for link
      // 2. file is an mp3
  // create a link
});

walker.on("end", function () {
  console.log("all done");
});

// sh.ln('--', 'test/testfile', dir+uuid());

// for (let item of sh.ls(dir)) {
//   console.log(item);
// }