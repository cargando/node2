const http = require("http"); // сервер
const url = require('url'); // работа с урлом
// const config = require('./config');
const { StringDecoder } = require('string_decoder');

let cnt = 1;

global.echo = function() {
	console.log.apply(this, arguments);
};

//
// curl http://localhost:8888/map/get?a=6\&name=Sasha -X POST -H ''


function processRequest(request, response) {
	// получить объект с распарсенным УРЛОМ от пользователя - www.ya.ru/map?get=msk&time=000
	const parsedURL = url.parse(request.url, true);
	const originalPath = parsedURL.pathname; // path without domain name
	const trimmedPath = (originalPath
		.replace(/^\/+|\/+$/g, ''))
		.replace(/\/\//g, '/');

	const queryStringObj = parsedURL.query; // get params from URL string
	const { headers, method } = request; // user request method & headers

	echo('>> Got ', cnt++, 'request , URL: ',
		originalPath, ', trimmedPath: ', trimmedPath, ', params: ', queryStringObj);
	echo('>> Method: ', method, ', headers: ', headers);



	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello World\n", cnt++);
	response.end();

};

// Create SERVER
const server = http.createServer(processRequest);
// Listen to PORT
server.listen(8888);