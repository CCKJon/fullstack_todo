<script>
	import { goto } from '$app/navigation';
	import Cock from '$lib/components/Cock.svelte';
	import Trashcan from '$lib/icons/Trashcan.svelte';
	import { onMount } from 'svelte';
	export let data;
	let answer;
	let title = data.title;
	let description = '';
	async function getTodo() {
		const response = await fetch(`http://127.0.0.1:8000/api/todo/${title}`);
		const data = await response.json();
		return data;
	}

	async function deleteTodo() {
		const response = await fetch(`http://127.0.0.1:8000/api/todo/${title}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				window.location = '/';
			})
			.catch((error) => {
				// Handle error
			});
	}

	function updateTodo() {
		fetch(`http://127.0.0.1:8000/api/todo/${title}?desc=${description}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: title,
				desc: description
			})
		})
			.then((response) => {
				// Handle response

				window.location = '/';
			})
			.catch((error) => {
				// Handle error
			});
	}

	onMount(async () => {
		answer = await getTodo();
		console.log(answer, 'this is my answer');
	});
</script>

<h1 class="text-rose-default grid place-items-center text-3xl font-bold p-3 mb-5">
	This is your To-do
</h1>
<h1 class="grid place-items-center text-2xl font-extrabold">{title}</h1>

<div class="mb-16">
	{#if answer}
		<div class="grid place-items-center text-center mx-auto text-rose-default">
			{answer.description}
		</div>
	{/if}
</div>

<div
	class="border-4 border-rose-default mb-10 w-96 mx auto text-center mx-auto grid place-items-center rounded-lg"
>
	<div class="grid place-items-center text-rose-default text-lg font-bold mt-3 mb-3">
		This is where you can update your To-do
	</div>
	<form
		class="mb-3 grid place-items-center text-rose-default"
		on:submit|preventDefault={updateTodo}
	>
		New description:
		<input class="mb-1" type="text" bind:value={description} />

		<button
			class="mt-3 mb-20 text-center grid place-items-center w-44 mx-auto rounded-md text-rose-default border-rose-default border-2 hover:bg-slate-600 font-bold"
			type="submit">Update To-do</button
		>
	</form>
</div>

<div class="mx-auto w-96 h-44 text-center">
	<div class="grid place-items-center mb-2 font-extrabold text-sm text-white" />
	<button class="mb-16 text-center grid place-items-center mx-auto text-white" on:click={deleteTodo}
		><svg
			viewBox="0 0 24 24"
			height="48"
			width="48"
			focusable="false"
			role="img"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="stroke-red-800"
			><title>Trash icon</title><polyline points="3 6 5 6 21 6" /><path
				d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
			/></svg
		></button
	>
</div>
<a class="grid place-items-center text-center, w-20 mx-auto text-white hover:bg-slate-600" href="/"
	><svg
		viewBox="0 0 24 24"
		height="48"
		width="48"
		focusable="false"
		role="img"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="stroke-indigo-800"
		><title>Home icon</title><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
			points="9 22 9 12 15 12 15 22"
		/></svg
	></a
>
