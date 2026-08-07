const RECONNECT_DELAY = 1800;

export function createSocket({ onEvent, onStatus }) {
	let socket;
	let shouldReconnect = true;
	let reconnectTimer;

	function connect() {
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		socket = new WebSocket(`${protocol}//${window.location.host}`);
		onStatus('connecting');
		socket.addEventListener('open', () => onStatus('open'));
		socket.addEventListener('message', (event) => {
			try { onEvent(JSON.parse(event.data)); } catch { onStatus('error'); }
		});
		socket.addEventListener('close', () => {
			onStatus('closed');
			if (shouldReconnect) reconnectTimer = window.setTimeout(connect, RECONNECT_DELAY);
		});
		socket.addEventListener('error', () => onStatus('error'));
	}

	return {
		connect,
		send(payload) {
			if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify(payload));
		},
		close() {
			shouldReconnect = false;
			window.clearTimeout(reconnectTimer);
			socket?.close();
		}
	};
}
