const { WebSocketServer, WebSocket } = require('ws');
const { MESSAGE_TYPES } = require('../shared/constants');
const { addClient, forEachClient, getClient, getUsernames, isUsernameTaken, removeClient } = require('./clients');
const { parseClientMessage, serialize } = require('./protocol');

function attachWebSocketServer(server) {
	const websocketServer = new WebSocketServer({ server });

	websocketServer.on('connection', (socket) => {
		addClient(socket, null);
		socket.on('message', (raw) => handleMessage(socket, raw));
		socket.on('close', () => handleDisconnect(socket));
		socket.on('error', () => handleDisconnect(socket));
	});

	return websocketServer;
}

function handleMessage(socket, raw) {
	const result = parseClientMessage(raw);
	if (result.error) return sendError(socket, result.error);

	const client = getClient(socket);
	const payload = result.value;

	if (payload.type === MESSAGE_TYPES.JOIN) return joinClient(socket, payload.username);
	if (!client || !client.username) return sendError(socket, 'Entre com um nome antes de enviar eventos.');

	if (payload.type === MESSAGE_TYPES.MESSAGE) {
		broadcast(MESSAGE_TYPES.MESSAGE, { sender: client.username, content: payload.content, timestamp: new Date().toISOString() });
	} else if (payload.type === MESSAGE_TYPES.TYPING) {
		broadcast(MESSAGE_TYPES.TYPING, { sender: client.username, active: payload.active }, socket);
	} else if (payload.type === MESSAGE_TYPES.PING) {
		send(socket, MESSAGE_TYPES.PONG);
	}
}

function joinClient(socket, username) {
	const client = getClient(socket);
	if (!client || client.username) return sendError(socket, 'Esta conexão já entrou no servidor.');
	if (isUsernameTaken(username)) return sendError(socket, 'Esse nome já está em uso. Escolha outro.');

	client.username = username;
	send(socket, MESSAGE_TYPES.WELCOME, { username });
	broadcast(MESSAGE_TYPES.SYSTEM, { content: `${username} entrou na conversa.` });
	broadcastUserList();
}

function handleDisconnect(socket) {
	const client = removeClient(socket);
	if (client && client.username) {
		broadcast(MESSAGE_TYPES.SYSTEM, { content: `${client.username} saiu da conversa.` });
		broadcastUserList();
	}
}

function broadcast(type, data, excludedSocket = null) {
	forEachClient((client) => {
		if (client.socket !== excludedSocket) send(client.socket, type, data);
	});
}

function broadcastUserList() {
	broadcast(MESSAGE_TYPES.USER_LIST, { users: getUsernames() });
}

function send(socket, type, data) {
	if (socket.readyState === WebSocket.OPEN) socket.send(serialize(type, data));
}

function sendError(socket, message) {
	send(socket, MESSAGE_TYPES.ERROR, { message });
}

module.exports = { attachWebSocketServer };
