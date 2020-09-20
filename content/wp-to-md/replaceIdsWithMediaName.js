//requiring path and fs modules
const path = require('path');
const fs = require('fs');
const glob = require("glob")
const globPattern = `./content/**/*.mdx`
const mediaMapping = require('./mapping.json')
console.log(mediaMapping);

const callback = (er, files) => {
    files.forEach((file, index) => {
        let fileContents = fs.readFileSync(file, 'utf-8')
        fileContents = fileContents.replace(/ids={\[\s?[\d,]+\s?\]}/g, (matched, index, original) => {
            let ids = matched.match(/(\d+)/g)
            ids = ids.map(id => parseInt(id))
            ids = ids.map(id => mediaMapping[id])
            const attribute = `imageNames={['${ids.join(`', '`)}']}`
            return attribute
        })
        fs.writeFileSync(file, fileContents, 'utf-8');
    })
}

glob(globPattern, callback) // RUN IT!
