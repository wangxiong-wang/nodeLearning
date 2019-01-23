'use strict';
//实现动态显示歌词
const path = require('path');
const fs = require('fs');
const iconv = require('iconv-lite');

fs.readFile(path.join(__dirname,'./../lyrics/血染的风采.lrc'),(error,data) => {
    if(error) throw error;
    //console.log(iconv.decode(data,'gbk'));
    let lines = iconv.decode(data,'gbk').split('\n');
    let regex = /\[(\d{2})\:(\d{2})\.(\d{2})\]\s(.+)/;
    //console.log(lines);
    lines.forEach((line) => {
        var matches = regex.exec(line);
        if(matches){
            let minutes = parseInt(matches[1]);
            let seconds = parseInt(matches[2]);
            let ms = parseInt(matches[3]);
            let lyric = matches[4];
            setTimeout(() => {
                console.log(lyric);
            },minutes * 60 * 1000 + seconds * 1000 + ms);
        }else{
            console.log(line);
        }
    });
});
