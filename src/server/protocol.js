const { LIMITS, MESSAGE_TYPES } = require('../shared/constants');

function parseClientMessage(raw) {
	let payload;

	try {
		payload = JSON.parse(raw.toString());
	} catch {
		return { error: 'A mensagem precisa ser um JSON válido.' };
	}

	if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
		return { error: 'O payload precisa ser um objeto JSON.' };
	}

	switch (payload.type) {
		case MESSAGE_TYPES.JOIN:
			return validateText(payload.username, LIMITS.username, 'username', 'nome de usuário');
		case MESSAGE_TYPES.MESSAGE:
			return validateText(payload.content, LIMITS.message, 'content', 'mensagem');
		case MESSAGE_TYPES.TYPING:
			return typeof payload.active === 'boolean'
				? { value: { type: MESSAGE_TYPES.TYPING, active: payload.active } }
				: { error: 'O estado de digitação precisa ser booleano.' };
		case MESSAGE_TYPES.PING:
			return { value: { type: MESSAGE_TYPES.PING } };
		default:
			return { error: 'Tipo de evento desconhecido.' };
	}
}

function validateText(value, maxLength, field, label) {
	if (typeof value !== 'string') return { error: `O ${label} precisa ser texto.` };

	const text = value.trim();
	if (!text) return { error: `O ${label} não pode ficar vazio.` };
	if (text.length > maxLength) return { error: `O ${label} pode ter no máximo ${maxLength} caracteres.` };

	return { value: { type: field === 'content' ? MESSAGE_TYPES.MESSAGE : MESSAGE_TYPES.JOIN, [field]: text } };
}

function serialize(type, data = {}) {
	return JSON.stringify({ type, ...data });
}

module.exports = { parseClientMessage, serialize };
