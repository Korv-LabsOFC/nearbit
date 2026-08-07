export function renderUsers(list, users, currentUser) {
	list.replaceChildren();
	users.forEach((username) => {
		const item = document.createElement('li');
		item.textContent = username === currentUser ? `${username} (você)` : username;
		list.append(item);
	});
}
