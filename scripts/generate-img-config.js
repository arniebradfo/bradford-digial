const fs = require("fs");
const path = require('path');
const glob = require("glob")
const sizeOf = require('image-size');

const imageTypes = [
    'jpg',
    'jpeg',
    'png',
    'svg',
    'gif'
]

const gatsbyConfig = require('../gatsby-config')
const filesystemSources = gatsbyConfig.plugins.filter(plugin => plugin.resolve === 'gatsby-source-filesystem')
const sourceDirectories = filesystemSources.map(filesystemSource => {
    const projectRoot = path.resolve('./')
    const filesystemSourcePath = path.resolve(filesystemSource.options.path)
    const relativeFilesystemSourcePath = '.' + filesystemSourcePath.substring(projectRoot.length)
    // return [projectRoot, filesystemSourcePath, relativeFilesystemSourcePath]
    return relativeFilesystemSourcePath
})
console.log(`Searching gatsby-source-filesystem directories:`, sourceDirectories);

const globPattern = `{${sourceDirectories.join(',')}}/*.{${imageTypes.join(',')}}`
// console.log('Reading glob pattern: ', globPattern);

const imgDimensions = {}
const callback = (er, files) => {
    files.forEach((file, index) => {
        // var fileSize = fs.statSync(file).size // we can't use this during netlify's gatsby build
        var fileName = path.basename(file)
        var dimensions = sizeOf(file)
        if (imgDimensions[`${fileName}`] != null)
            console.warn(`All media files must have a unique name. '${fileName}' is duplicated and is being overwritten`)
        imgDimensions[`${fileName}`] = {
            height: dimensions.height,
            width: dimensions.width,
            aspectRatio: dimensions.width / dimensions.height,
        };
    })
    fs.writeFileSync('./scripts/media-dimensions.json', JSON.stringify(imgDimensions), 'utf-8')
    console.log(`DONE! Mapped ${Object.keys(imgDimensions).length} media files`)
}

glob(globPattern, callback) // RUN IT!
