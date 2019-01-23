'use strict';

const path = require('path');
const fs = require('fs');

//fs.writeFileSync();

//fs.writeFile(); 默认覆盖文件
//JSON.stringfy() 序列化
//JSON.parse() 反序列化
fs.appendFile(path.join(__dirname, '../temp/txt1.txt'), JSON.stringify({
    id: 10
}), (error) => {
    if (error) throw error;
    console.log('sucess!');
});
//fs.createWriteStream();

// let writeStream = fs.createWriteStream(path.join(__dirname, '../temp/txt2.txt'));
// writeStream.write('hello world!', () => {

// })