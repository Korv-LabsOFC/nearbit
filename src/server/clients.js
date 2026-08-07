const clients = new Map();

function addClient(socket, username) {
	const client = { socket, username, id: cryptoRandomId() };
	clients.set(socket, client);
	return client;
}

function removeClient(socket) {
	const client = clients.get(socket);
	clients.delete(socket);
	return client;
}

function getClient(socket) {
	return clients.get(socket);
}

function getUsernames() {
	return [...clients.values()]
		.filter((client) => client.username)
		.map((client) => client.username);
}

function isUsernameTaken(username) {
	return getUsernames().some((current) => current.toLocaleLowerCase() === username.toLocaleLowerCase());
}

function forEachClient(callback) {
	clients.forEach(callback);
}

function cryptoRandomId() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

module.exports = { addClient, forEachClient, getClient, getUsernames, isUsernameTaken, removeClient };
