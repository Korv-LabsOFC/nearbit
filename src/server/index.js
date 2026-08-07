const express = require('express');
const http = require('node:http');
const path = require('node:path');
const { HOST, PORT } = require('../shared/constants');
const { attachWebSocketServer } = require('./websocket');

function createServer() {
	const app = express();
	const publicDirectory = path.resolve(__dirname, '../../public');

	app.disable('x-powered-by');
	app.use(express.static(publicDirectory));
	app.get('/health', (_request, response) => response.json({ status: 'ok', service: 'nearbit' }));

	const server = http.createServer(app);
	const websocketServer = attachWebSocketServer(server);

	return { app, server, websocketServer };
}

function startServer() {
	const { server } = createServer();
	server.listen(PORT, HOST, () => {
		console.log(`Nearbit disponível em http://localhost:${PORT}`);
	});
	return server;
}

if (require.main === module) startServer();

module.exports = { createServer, startServer };
