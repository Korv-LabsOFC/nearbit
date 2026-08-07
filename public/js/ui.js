export function setConnectionStatus(element, label, state) {
	element.classList.toggle('is-online', state === 'open');
	element.classList.toggle('is-offline', state !== 'open');
	label.textContent = state === 'open' ? 'Conectado' : state === 'connecting' ? 'Conectando' : 'Reconectando';
}

export function setTyping(element, sender, active) {
	element.textContent = active ? `${sender} está escrevendo...` : '';
}

export function setUserCount(countElements, count) {
	countElements.forEach((element) => { element.textContent = `${count} online`; });
}
