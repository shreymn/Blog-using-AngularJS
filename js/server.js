var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// Create a server
http.createServer( function(request, response) {
	var pathname = url.parse(request.url).pathname;
	var isImage = 0, contentType, fileToLoad;
	var extension = pathname.split('.').pop();
	var file = "../" + pathname;
	var dirs = pathname.split('/');
	if(pathname == "/"){
		file = "index.html";
		contentType = 'text/html';
		isImage = 2;
	}
	else if(dirs[1] != "hidden" && pathname != "/server.js"){
		switch(extension){
			case "jpg":
				contentType = 'image/jpg';
				isImage = 1;
				break;
			case "png":
				contentType = 'image/png';
				isImage = 1;
				break;
			case "js":
				contentType = 'text/javascript';
				isImage = 2;
				break;
			case "css":
				contentType = 'text/css';
				isImage = 2;
				break;
			case "html":
				contentType = 'text/html';
				isImage = 2;
				break;
		}
	}
	if(isImage == 1){
		fileToLoad = fs.readFileSync(file);
		response.writeHead(200, {'Content-Type':  contentType });
		response.end(fileToLoad, 'binary');
	}
	else if(isImage == 2){
		fileToLoad = fs.readFileSync(file, "utf8");
		response.writeHead(200, {'Content-Type':  contentType });
		response.write(fileToLoad);
		response.end();
	}
}).listen(8082);

// Console will print the message
console.log('Server running at http://127.0.0.1:8082/');