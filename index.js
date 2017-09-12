const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer();

server.on('request', (request, response) => {
 const {method, url, headers} = request;


 let filePath = '.' + url;

 if (filePath == './') {
 	filePath = './public/index.html'
 }

 let extname = path.extname(filePath);

 let contentType = 'text/html';

    switch (extname) {
    	case '.html':
    		contentType = 'text/html';
    		break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
    fs.readFile(filePath, function (error, data) {

    	if (error) {
    		response.statusCode = 404;
			response.end("File Not Found");
    	} else {
    		response.setHeader("Content-type", contentType);
    		response.end(data);
    	}
    })

});

 server.listen(80);