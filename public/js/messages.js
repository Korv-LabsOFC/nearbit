export function addMessage(container, payload) {
	const element = document.createElement('article');
	element.className = payload.type === 'system' ? 'message system' : 'message';

	if (payload.type === 'system') {
		element.textContent = payload.content;
	} else {
		const meta = document.createElement('div');
		meta.className = 'message-meta';
		const author = document.createElement('span');
		author.className = 'message-author';
		author.textContent = payload.sender;
		meta.append(author, formatTime(payload.timestamp));

		const content = document.createElement('p');
		content.className = 'message-content';
		content.textContent = payload.content;
		element.append(meta, content);
	}

	container.append(element);
	container.scrollTop = container.scrollHeight;
}

function formatTime(timestamp) {
	if (!timestamp) return '';
	return new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(timestamp));
}
