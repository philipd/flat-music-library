const fs = require('fs');
const uuid = require('uuid').v4;
const sh = require('shelljs');
const json = JSON;
const walk = require('walk');
const NodeID3 = require('node-id3');
const mm = require('music-metadata');

const isMp3 = function(filepath) {
  return filepath.substring(filepath.length-3, filepath.length) === 'mp3';
}

const getGuid = function(filepath) {
  // let result = false;
  // NodeID3.read(filepath, function(e, t) { 
  //   result = t.TXXX ? t.TXXX.find( element => element.description === 'guid' ) : false; 
  // });
  // return result;
}

const linkExists = function(filepath) {
  return true;
}

const testTags = function(filepath) {
  const tags = {
    TXXX: [ { description: 'guid', value: uuid() } ]
  }
  const success = NodeID3.update(tags, filepath);
  NodeID3.read(filepath, function(e, t) { console.log(t.raw); });
}


const config = json.parse(fs.readFileSync('config.json'));
const dir = config.taggerDirectory;
const options = {
  // followLinks: false,
  filters: ["Temp", "_Temp"]
};

console.log(dir);

const walker = walk.walk(dir, options);

walker.on("file", (root, fileStats, next) => {
  const filepath = root + "/" + fileStats.name;
  isMp3(fileStats.name) ? testTags(filepath) : null;
  // isMp3(fileStats.name) ? console.log(getGuid(filepath)) : null;
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