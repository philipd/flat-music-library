const fs = require('fs');
const uuid = require('uuid').v4;
const sh = require('shelljs');
const json = JSON;
const walk = require('walk');
const id3 = require('node-id3');
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

const setGuid = function(filepath) {
  const tags = id3.read(filepath);

  if(tags.userDefinedText && tags.userDefinedText.find( x => x.description === 'guid' )) {
    // guid exists; do nothing
  } else {
    console.log('inside');
    const newTags = {
      TXXX: [ { description: 'guid', value: uuid() } ]
    };
    const success = id3.update(newTags, filepath);
    id3.read(filepath, function(e, t) { console.log(t.raw); });
  }
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

  if(isMp3(fileStats.name)) {
    // set guid if it doesn't exist
    setGuid(filepath);
    // create link if it doesn't exist
  } 
  
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