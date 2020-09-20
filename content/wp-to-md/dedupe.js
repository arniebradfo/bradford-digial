//requiring path and fs modules
const path = require('path');
const fs = require('fs');

const matchDuplicateImgRegEx = /\d+x\d+\./ig;

//joining path of directory
const directoryPath = path.join(__dirname, 'uploads');

//passing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {

    //handling error
    if (err) return console.log('Unable to scan directory: ' + err);

    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file

        if (file.match(matchDuplicateImgRegEx)) {
            fs.unlinkSync(path.join(__dirname, 'uploads', file));
            console.log('yes', file);
        }
        else console.log('no', file);


    });

});