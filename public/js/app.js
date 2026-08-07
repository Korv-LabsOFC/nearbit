import { createSocket } from './socket.js';
import { addMessage } from './messages.js';
import { renderUsers } from './users.js';
import { setConnectionStatus, setTyping, setUserCount } from './ui.js';

const joinScreen = document.querySelector('#join-screen');
const chatScreen = document.querySelector('#chat-screen');
const joinForm = document.querySelector('#join-form');
const usernameInput = document.querySelector('#username');
const joinError = document.querySelector('#join-error');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const messages = document.querySelector('#messages');
const userList = document.querySelector('#user-list');
const connection = document.querySelector('#connection-status');
const connectionLabel = document.querySelector('#connection-label');
const typingIndicator = document.querySelector('#typing-indicator');
const onlineCount = document.querySelector('#online-count');
const panelCount = document.querySelector('#panel-count');
let username = '';
let typingTimer;
let socket;

joinForm.addEventListener('submit', (event) => {
	event.preventDefault();
	username = usernameInput.value.trim();
	if (!username) return;
	joinError.textContent = '';
	joinScreen.classList.add('is-hidden');
	chatScreen.classList.remove('is-hidden');
	socket = createSocket({
		onEvent: handleEvent,
		onStatus: (state) => {
			setConnectionStatus(connection, connectionLabel, state);
			if (state === 'open') socket.send({ type: 'join', username });
		}
	});
	socket.connect();
});

messageForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const content = messageInput.value.trim();
	if (!content) return;
	socket.send({ type: 'message', content });
	messageInput.value = '';
	socket.send({ type: 'typing', active: false });
});

messageInput.addEventListener('input', () => {
	socket?.send({ type: 'typing', active: true });
	window.clearTimeout(typingTimer);
	typingTimer = window.setTimeout(() => socket?.send({ type: 'typing', active: false }), 900);
});

document.querySelector('#leave-button').addEventListener('click', () => {
	socket?.close();
	window.location.reload();
});

function handleEvent(event) {
	if (event.type === 'message' || event.type === 'system') addMessage(messages, event);
	if (event.type === 'user_list') {
		renderUsers(userList, event.users, username);
		setUserCount([onlineCount], event.users.length);
		panelCount.textContent = event.users.length;
	}
	if (event.type === 'typing' && event.sender !== username) setTyping(typingIndicator, event.sender, event.active);
	if (event.type === 'error') addMessage(messages, { type: 'system', content: event.message });
}

usernameInput.focus();
