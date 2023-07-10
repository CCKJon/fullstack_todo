<script>
	// @ts-nocheck

	import { goto } from '$app/navigation';
	import Cock from '$lib/components/Cock.svelte';
	import Trashcan from '$lib/icons/Trashcan.svelte';
	import { onMount } from 'svelte';
	export let data;
	/**
	 * @type {{ description: any; }}
	 */
	let answer;
	let category = '';
	let title = '';
	let description = '';
	let id = data.id;
	let updatedTitle = '';
	/**
	 * @type {string | number | Date}
	 */
	let due_date;

	async function getTodo() {
		const response = await fetch(`https://todo-test-api-jelz.onrender.com/api/todo/${id}`);
		const data = await response.json();
		return data;
	}

	async function deleteTodo() {
		const response = await fetch(`https://todo-test-api-jelz.onrender.com/api/todo/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => {
				// @ts-ignore
				window.location = '/';
			})
			.catch((error) => {
				// Handle error
			});
	}

	function updateTodo() {
		fetch(`https://todo-test-api-jelz.onrender.com/api/todo/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category,
				title,
				description,
				due_date: due_date ? new Date(due_date).toISOString().split('T')[0].toString() : 'null'
			})
		})
			.then((_res) => {
				goto('/');
			})
			.catch((_err) => {
				_err = !_err;
			});
	}

	onMount(async () => {
		answer = await getTodo();
		title = answer.title;
		description = answer.description;
		due_date = answer.due_date;
	});
</script>

<div class="flex flex-row justify-between text-white py-8">
	<button class="ml-8 mt-[-5px]"
		><svg
			viewBox="0 0 24 24"
			height="35"
			width="35"
			focusable="false"
			role="img"
			fill="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			class="StyledIconBase-sc-ea9ulj-0 hRnJPC"
			><title>Navigation icon</title><path
				d="M2.75 18h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.5h18.6-18.5zm0-6.5h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.5h18.6-18.5zm0-6.5h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.49h18.6-18.5z"
			/></svg
		></button
	>
	<div class="flex flex-row gap-4">
		<button class="absolute right-6"
			><svg
				viewBox="0 0 16 16"
				height="25"
				width="25"
				focusable="false"
				role="img"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg"
				class="StyledIconBase-sc-ea9ulj-0 hRnJPC"
				><title>Bell icon</title><path
					d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
				/></svg
			></button
		>
	</div>
</div>
{#if answer}
	<h1 class="grid place-items-center text-2xl font-bold text-white mb-3 mt-24">{answer.title}</h1>
	<hr class="w-60 grid place-items-center mx-auto mb-3" />
	<div class="mb-24">
		<div class="grid place-items-center text-center mx-auto text-cyan-400">
			{answer.description}
		</div>
	</div>

	<div class="mb-10 w-96 mx auto text-center mx-auto grid place-items-center rounded-lg text-white">
		<form class="mb-3 grid place-items-center text-rose-default" on:submit={updateTodo}>
			<div class="text- text-center text-md mb-2">New Title:</div>
			<input
				required
				class="mb-1 rounded-xl text-black border-4 border-pink-400 placeholder:text-slate-300 w-52"
				type="text"
				placeholder={title}
				bind:value={title}
			/>

			<div class="text- text-center text-md mb-2">New description:</div>
			<input
				class="mb-1 rounded-xl text-black border-4 border-pink-400 placeholder:text-slate-300 w-52"
				type="text"
				placeholder={description}
				bind:value={description}
			/>
			<div class="text- text-center text-md mb-2">New due date:</div>
			<input
				class="mb-1 rounded-xl text-black border-4 border-pink-400 placeholder:text-slate-300 w-52"
				type="date"
				placeholder={due_date}
				bind:value={due_date}
			/>

			<button
				class="py-1 px-1 mt-3 mb-20 text-center grid place-items-center w-44 mx-auto rounded-md text-white border-indigo-800 border-2 hover:bg-slate-600 font-bold"
				type="submit">Update To-do</button
			>
		</form>
	</div>
{/if}
<div class="grid grid-cols-1 h-26 items-end">
	<div class="flex flex-row justify-between px-6">
		<div>
			<button on:click={deleteTodo}
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
		<div>
			<a href="/"
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
					><title>Home icon</title><path
						d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
					/><polyline points="9 22 9 12 15 12 15 22" /></svg
				>
			</a>
		</div>
	</div>
</div>
