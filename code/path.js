//path模块的基本使用
'use strict';
const path = require('path');
const temp = path.join(__dirname,'./../lyrics/血染的风采.lrc');
// path.basename(path[, ext]) 获取文件名
//console.log(path.basename(temp,'.lrc'));

// path.delimiter 获取不同操作系统中默认路径的分隔符
//console.log(path.delimiter);

//获取环境变量
console.log(process.env.PATH.split(path.delimiter));

// path.dirname(path) 获取文件目录
//console.log(path.dirname(temp));

// path.extname(path) 获取路径中的扩展名
//console.log(path.extname(temp));

// path.format(pathObject)

// path.isAbsolute(path) 判断是不是绝对路径
//console.log(path.isAbsolute(temp));

// path.join([...paths]) 路径拼合

// path.normalize(path) 常规化一个路径

// path.parse(path) 将一个路径字符串转换为对象(包含目录，文件名，扩展名)；
let obj = path.parse(temp);
//console.log(obj);
//console.log(path.format(obj));
// path.posix
// path.relative(from, to)

console.log(path.relative(__dirname,'/Users/xiazhixing/Documents/javascript/Nodejs/day03/lyrics/血染的风采.lrc'))
// path.resolve([...paths])
// path.sep
// path.win32