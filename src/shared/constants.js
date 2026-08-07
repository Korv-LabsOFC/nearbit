const PORT = Number(process.env.PORT) || 5050;
const HOST = process.env.HOST || '0.0.0.0';

const LIMITS = Object.freeze({
	username: 24,
	message: 500
});

const MESSAGE_TYPES = Object.freeze({
	JOIN: 'join',
	MESSAGE: 'message',
	USER_LIST: 'user_list',
	TYPING: 'typing',
	LEAVE: 'leave',
	PING: 'ping',
	PONG: 'pong',
	WELCOME: 'welcome',
	SYSTEM: 'system',
	ERROR: 'error'
});

module.exports = { HOST, LIMITS, MESSAGE_TYPES, PORT };
