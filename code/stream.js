'use strict';
/* 
    实现歌词动态提示
*/
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const iconv = require('iconv-lite');
const regex = /\[(\d{2})\:(\d{2})\.(\d{3})\](.+)/;  //[00:00.000]相约一九九八

let streamReader = fs.createReadStream(path.join(__dirname,'../lyrics/相约一九九八.lrc'))
    .pipe(iconv.decodeStream('gbk'));
let readLine = readline.createInterface({input:streamReader});

let begin = new Date().getTime();
readLine.on('line',(line) => {  //注册line事件
    task(line,begin);
})

function task(line,startTime){
    var matches = regex.exec(line);
    //console.log(matches);
    if (matches) {
        let minutes = parseInt(matches[1]);
        let seconds = parseInt(matches[2]);
        let ms = parseInt(matches[3]);
        let lyric = matches[4];
        let offset = new Date().getTime() - begin;
        setTimeout(() => {
            console.log(lyric);
        }, minutes * 60 * 1000 + seconds * 1000 + ms);
    } else {
        console.log(line);
    }    
}