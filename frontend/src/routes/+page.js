// const values = [{name: "Slug One", text:"text for slug one"},
// {name: "Slug Two", text:"text for slug two"},
// {name: "Slug Three", text:"text for slug three"}
// ];

async function getTodos() {
	const response = await fetch('https://todo-test-xpj7.onrender.com//api/todo/');
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
