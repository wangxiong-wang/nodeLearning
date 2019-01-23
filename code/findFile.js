'use strict';

const path = require('path');
const fs = require('fs');
require('./proto.js');

let target = path.join(__dirname, process.argv[2] || './');
fs.readdir(target, (error, files) => {
    //console.log(files);
    files.forEach((file) => {
        //console.log(file); 文件名
        fs.stat(path.join(target, file), (error, stats) => {
            console.log(`${stats.mtime.format('yyyy/MM/dd HH:mm')}\t${stats.size}\t${file}`);
        });
    });
})