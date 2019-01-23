/*
 * @Author: wangxiong.wang 
 * @Date: 2018-04-08 19:10:48
 */

'use strict';

const path = require('path');
const fs = require('fs');
require('./proto.js');

let target = path.join(__dirname, process.argv[2] || './');

function load(target, depth) {
    let preix = new Array(depth + 1).join('│ ');

    let files = [];
    let dirs = [];
    let dirInfos = fs.readdirSync(target);
    dirInfos.forEach((info) => {
        let stats = fs.statSync(path.join(target, info));
        if (stats.isFile()) {
            files.push(info);
        } else {
            dirs.push(info);
        }
    });
    dirs.forEach((dir) => {
        console.log(`${preix}├─${dir}`);
        //arguments.callee.load(path.join(target, dir), depth + 1);
        load(path.join(target, dir), depth + 1);
    });
    let count = files.length - 1;
    files.forEach((file) => {
        let temp = count--?'├':'└';
        console.log(`${preix}${temp}─${file}`);
    });
}

load(target, 0);