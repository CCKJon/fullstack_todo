// const values = [{name: "Slug One", text:"text for slug one"},
// {name: "Slug Two", text:"text for slug two"},
// {name: "Slug Three", text:"text for slug three"}
// ];

async function getTodos() {
	const response = await fetch('http://127.0.0.1:8000/api/todo/');
	const data = await response.json();
	return data;
}

const values = await getTodos();

export function load() {
	return {
		items: values
	};
}

// This is next part where I need to connect my API
