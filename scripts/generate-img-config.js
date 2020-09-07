const fs = require("fs");
const path = require('path');
const glob = require("glob")
const sizeOf = require('image-size');
// const cliProgress = require('cli-progress');

// TODO: look in gatsby-config.js for plugins gatsby-source-filesystem options path, name
// and build sourceFolders based on that
const sourceFolders = [
    `content/blog`,
    `content/assets`,
    `content/lfs-media`,
    'content/ignore-media'
]
const imageTypes = [
    'jpg',
    'jpeg',
    'png',
    'svg',
    'gif'
]

const imgDimensions = {}
const callback = (er, files) => {
    // console.log(er, files)
    // const bar1 = new cliProgress.SingleBar()
    // bar1.start(files.length, 0)
    files.forEach((file, index) => {
        var fileSize = fs.statSync(file).size
        var fileName = path.basename(file)
        var dimensions = sizeOf(file)
        // console.log(stats, dimensions)
        // imgDimensions[`${fileName}-${fileSize}`] = {
        if (imgDimensions[`${fileName}`] != null)
            console.warn(`All media files must have a unique name. '${fileName}' is duplicated and is being overwritten`)
        imgDimensions[`${fileName}`] = {
            height: dimensions.height,
            width: dimensions.width,
            aspectRatio: dimensions.width / dimensions.height,
        };
        // bar1.update(index + 1)
    })
    // bar1.stop()
    // console.log(imgDimensions);
    fs.writeFileSync('./scripts/media-dimensions.json', JSON.stringify(imgDimensions), 'utf-8')
    //TODO: detect if there were duplicate fileSizes
    // console.log('done')

}
// sourceFolders.forEach(sourceFolder => {

const globPattern = `./{${sourceFolders.join(',')}}/*.{${imageTypes.join(',')}}`
console.log('reading glob pattern: ', globPattern);
glob(globPattern, callback)

// })

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