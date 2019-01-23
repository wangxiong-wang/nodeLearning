//同步调用和异步调用
'use strict';
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// console.time('sync');
// fs.readFile(path.join(__dirname,'../typings/tsd.d.ts'),'utf8',(error,data) => {
//     if(error) throw error;
//     //console.log(data);
// });
// console.timeEnd('sync');

console.time('async');
try {
    let data = fs.readFileSync(path.join(__dirname,'../typings/tsd.d.ts'),'utf8');
} catch (error) {
    throw error;
}
console.timeEnd('async');

