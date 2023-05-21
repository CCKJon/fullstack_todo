<script>
	import { onMount } from 'svelte';
	export let data;
	console.log('this is my data', data);
	let Todos = data.items;
	onMount(() => {
		Todos = Todos;
	});
</script>

<!-- <header>NavBar</header> -->

<h1 class="text-gray-900 grid place-items-center text-4xl font-extrabold p-3">User's To-Do List</h1>
<div class="grid place-items-center text-rose-default font-bold text-2xl mb-6">
	To-do lists are very cool, trust me
</div>
<div class="w-80 mx-auto border-4 rounded-md border-rose-darker">
	{#each Todos as todo}
		<div>
			<a
				class="grid place-items-center mt-3 text-gray-700 font-bold hover:bg-rose-default"
				href={`/${todo.title}`}>{todo.title}</a
			>
			<p class="grid place-items-center mb-3 text-rose-default text-center">{todo.description}</p>
		</div>
	{/each}
</div>
<div>
	<div>
		<a
			class="grid place-items-center text-xl text-rose-lighter font-bold mt-5 border-2 border-rose-default w-52 py-2 mx-auto rounded-md hover:bg-slate-700 border-b-4"
			id="Im_an_id"
			href="/new_todo">Create a new To-Do</a
		>
	</div>
</div>
