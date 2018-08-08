//导入模块
const fs = require('fs');
const http = require('http');
const path = require('path');

//引入第三方模块包
const mime = require('mime');
//记录网站的根目录
let rootPath = path.join(__dirname, 'server');

//创建服务器
let server = http.createServer((request, response) => {
	//生成地址
	let targetPath = path.join(rootPath, request.url);
	// 判断路径是否存在
	if (fs.existsSync(targetPath)) {
		//判断是文件还是文件夹
		fs.stat(targetPath, (err, stats) => {
			if (stats.isFile()) {
				//使用mime设置类型
				response.setHeader('content-type', mime.getType(targetPath));
				fs.readFile(targetPath, (err, data) => {
					//数据读取完毕
					response.setHeader('content-type', 'text/html;charset= utf-8');
					response.end(data);
				});
			}
			//如果是文件夹就显示列表
			if (stats.isDirectory()) {
				fs.readdir(targetPath, (err, files) => {
					let tem = '';
					//遍历
					for (let i = 0; i < files.length; i++) {
						tem += `
						<li>
               				 <a href="${request.url}${request.url == '/' ? '' : '/'}${files[i]}">${files[i]}</a>
            			</li>
						`
					}
					response.setHeader('content-type', 'text/html;charset= utf-8');
					response.end(`
					<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
					<html>
					<head>
						<title>Index of/ </title>
					</head>
					<body>
                  <h1>Index of ${request.url}</h1>
                  <ul>
                      ${tem}
                  </ul>
              </body>             
              </html>
					`);
				});
			}
		});
	} else {
		//不存在报错404
		response.statusCode == 404;
		response.setHeader('content-type', 'text/html;charset= utf-8');
		response.end(` <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
            <html><head>
            <title>404 Not Found</title>
            </head><body>
            <h1>Not Found</h1>
            <p>你请求的${request.url} 不在服务器上!</p>
            </body></html>`);
	}
});

//开启监听
server.listen(8000, '127.0.0.1', () => {
	console.log('开启成功');
})