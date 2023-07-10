async function getTodos() {
	const response = await fetch('https://todo-test-api-jelz.onrender.com/api/todo/');
	const data = await response.json();
	return data;
}

let todos = getTodos();

export function load() {
	return {
		items: todos
	};
}

// This is next part where I need to connect my API
