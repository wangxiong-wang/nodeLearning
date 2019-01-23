##### fs：

基础的文件操作 API

##### path：

提供和路径相关的操作 API

##### readline：

用于读取大文本文件，一行一行读

##### fs-extra（第三方）：

https://www.npmjs.com/package/fs-extra 



### 同步或异步调用

- fs模块对文件的几乎所有操作都有同步和异步两种形式
- 例如：readFile() 和 readFileSync()
- 区别：
  + 同步调用会阻塞代码的执行，异步则不会
  + 异步调用会将读取任务下达到任务队列，直到任务执行完成才会回调
  + 异常处理方面，同步必须使用 try catch 方式，异步可以通过回调函数的第一个参数

```javascript
console.time('sync');
try {
  var data = fs.readFileSync(path.join('C:\\Users\\iceStone\\Downloads', 'H.mp4'));
  // console.log(data);
} catch (error) {
  throw error;
}
console.timeEnd('sync');

console.time('async');
fs.readFile(path.join('C:\\Users\\iceStone\\Downloads', 'H.mp4'), (error, data) => {
  if (error) throw error;
  // console.log(data);
});
console.timeEnd('async');
```
### 文件读取

Node中文件读取的方式主要有：

#### fs.readFile(file[, options], callback(error, data))

```javascript
fs.readFile('c:\\demo\1.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

#### fs.readFileSync(file[, options])

```javascript
try {
  const data = fs.readFileSync('c:\\demo\1.txt', 'utf8');
  console.log(data);
} catch(e) {
  // 文件不存在，或者权限错误
  throw e;
}
```

#### fs.createReadStream(path[, options])

```javascript
const stream = fs.createReadStream('c:\\demo\1.txt');
let data = ''
stream.on('data', (trunk) => {
  data += trunk;
});
stream.on('end', () => {
  console.log(data);
});
```

### Readline模块逐行读取文本内容

```javascript
const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('sample.txt')
});

rl.on('line', (line) => {
  console.log('Line from file:', line);
});
```


### 文件写入

Node中文件写入的方式主要有：

#### fs.writeFile(file, data[, options], callback(error))

```javascript
fs.writeFile('c:\\demo\a.txt', new Date(), (error) => {
  console.log(error);
});
```

#### fs.writeFileSync(file, data[, options])

```javascript
try {
  fs.writeFileSync('c:\\demo\a.txt', new Date());
} catch (error) {
  // 文件夹不存在，或者权限错误
  console.log(error);
}
```

#### fs.createWriteStream(path[,option])

```javascript
var streamWriter = fs.createWriteStream('c:\\demo\a.txt');
setInterval(() => {
  streamWriter.write(`${new Date}\n`, (error) => {
    console.log(error);
  });
}, 1000);
```


### 文件写入


#### fs.appendFile(file,data[,options],callback(err))

```javascript
setInterval(() => {
  fs.appendFile('c:\\demo\a.txt',`${new Date}\n`, (error) => {
    console.log(error);
  });
}, 1000);
```

#### fs.appendFileSync(file,data[,options])

```javascript
setInterval(() => {
  fs.appendFileSync('c:\\demo\a.txt',`${new Date}\n`);
}, 1000);
```


### 其他常见文件操作

#### 验证路径是否存在（过时的API）

- fs.exists(path,callback(exists))
- fs.existsSync(path) // => 返回布尔类型 exists

#### 获取文件信息

- fs.stat(path,callback(err,stats))
- fs.statSync(path) // => 返回一个fs.Stats实例

#### 移动文件或重命名文件或目录

> 与命令行相同，重命名操作也可以实现文件移动

- fs.rename(oldPath,newPath,callback)
- fs.renameSync(oldPath,newPath)

#### 删除文件

- fs.unlink(path,callback(err))
- fs.unlinkSync(path)



### 其他常见文件夹操作

#### 创建一个目录

- fs.mkdir(path[,model],callback)
- fs.mkdirSync(path[,model])

#### 删除一个空目录

- fs.rmdir(path,callback)
- fs.rmdirSync(path)

#### 读取一个目录

- fs.readdir(path,callback(err,files))
- fs.readdirSync(path) // => 返回files



### 文件监视

#### 利用文件监视实现自动 markdown 文件转换

- 相关链接：

  1. https://github.com/chjj/marked
  2. https://github.com/Browsersync/browser-sync 

- 实现思路：
  1. 利用`fs`模块的文件监视功能监视指定MD文件
  2. 当文件发生变化后，借助`marked`包提供的`markdown` to `html`功能将改变后的MD文件转换为HTML
  3. 再将得到的HTML替换到模版中
  4. 最后利用BrowserSync模块实现浏览器自动刷新
  
```javascript
const fs = require('fs');
const path = require('path');
var marked = require('marked');
var bs = require('browser-sync').create();


var target = path.join(__dirname, process.argv[2] || './README.md');
var filename = path.basename(target, path.extname(target)) + '.html';
var targetHtml = path.join(path.dirname(target), filename);

bs.init({
  server: path.dirname(target),
  index: filename,
  notify: false
});

bs.reload(filename);

var template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <style>{{{styles}}}</style>
</head>
<body>
  <article class="markdown">
    {{{body}}}
  </article>
</body>
</html>
`;

fs.readFile(path.join(__dirname, './markdown.css'), 'utf8', (error, css) => {
  if (error) throw error;
  template = template.replace('{{{styles}}}', css);
  var handler = (current, previous) => {
    fs.readFile(target, 'utf8', (error, content) => {
      var html = template.replace('{{{body}}}', marked(content));
      fs.writeFile(targetHtml, html, (error) => {
        if (!error) {
          console.log(`updated@${new Date()}`);
          bs.reload(filename);
        }
      });
    });
  };
  handler();
  fs.watchFile(target, { interval: 100 }, handler);
});
```# nodeLearning
# nodeLearning
