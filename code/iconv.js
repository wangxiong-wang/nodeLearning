'use strict';
const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

fs.readFile(path.join(__dirname,'./../lyrics/血染的风采.lrc'),(error,data)=>{
    if(error) throw error;
    //console.log(iconv.decode(data,'gbk'));
})