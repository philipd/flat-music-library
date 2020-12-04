## Disclaimer

This software is provided as-is without any warranty whatsoever. Run it at your own risk.

This software is released under an MIT license.

## Introduction

flat-music-library is a work in progress, designed to solve problems with music library software products that expect audio files to retain a constant file structure over time.

flat-music-library allows you to rename, reorganize, and restructure files and directories in your music library without breaking the ability of library software to track those files.

It works by adding a GUID to the metadata of every mp3 in a directory and creating a collection of [hard links](https://en.wikipedia.org/wiki/Hard_link) to each mp3 file with the GUID as the filename.

The result is a flat directory full of uniquely-named hard links that can be imported into your music library software. Because hard links point to [inodes](https://en.wikipedia.org/wiki/Inode), not filesystem locations, the original files can be renamed or moved elsewhere on the drive without breaking the links.

Be aware that if a hard link exists, deleting the original file will not delete the data, your hard link will still function like a normal file, and no disk space will be made available on your drive. Truly deleting the data requires deletion of the original file *and* the hard link. In fact, there isn't really a practical distinction between a hard link and the file which it was created from; neither depends on the other to exist.

## Requirements

You will need node.js and npm to run this program.

Your filesystem needs to support hard links, and your files will need to exist on the same physical drive.

## Installation

```git clone``` or ```wget``` the directory, then ```npm install```. Make a copy of config.json.example, rename it to config.json and edit it with your chosen configuration parameters. Run the program with ```npm start```.

