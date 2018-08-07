//导入模块
const fs = require('fs');
const http = require('http');
const path = require('path');

//记录网站的根目录
let rootPath = path.join(_dirname,'www');

//创建服务器
let server = http.createServer((request,response)=>{
	response.end('hello');
});

//开启监听
server.listen(9000,'127.0.0.1',()=>{
	console.log('开启成功');
})