var fs = require("fs");
var glob = require("glob")
var sizeOf = require('image-size');

// console.log(__dirname);

const sourceFolders = [
    `content/blog`,
    `content/assets`,
    `content/lfs-media`
]
const imageTypes = [
    'jpg',
    'jpeg',
    'png',
    'svg',
    'gif'
]

const callback = (er, files) => {
    console.log(er, files)
}
let files = []
sourceFolders.forEach(sourceFolder => {
    const globPattern = `**/${sourceFolder}/*.{${imageTypes.join(',')}}`
    console.log(globPattern);
    files = files.concat(glob.sync(globPattern))
})
console.log(files);

// feed all the images from public folders
/*
make an object of {
    [`${fileName}-${fileSize}`]: {
        height: number,
        width: number,
        aspectRatio: number,
    };
}
*/

// var stats = fs.statSync("myfile.txt")
// var fileSizeInBytes = stats["size"]