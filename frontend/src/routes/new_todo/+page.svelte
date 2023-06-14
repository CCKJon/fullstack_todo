<script lang="ts">
	import { goto } from '$app/navigation';
	import Modal from '$lib/components/Modal.svelte';

	// let showCreateTodoModal = false;
	let showModal = false;
	let title = '';
	let description = '';
	let todo = '';
	let completion = false;
	let create_date = '';
	let due_date = '';

	function showAndHideModal() {
		showModal = true; // Show the modal

		setTimeout(() => {
			showModal = false; // Hide the modal after the delay
			goto('/'); // Redirect to the desired location
		}, 3000); // Specify the delay in milliseconds (e.g., 3000ms = 3 seconds)
	}

	function handleSubmit(event: any) {
		event.preventDefault();

		const newTodo = {
			category: category == 'All' ? (category = '') : category,
			title,
			description,
			completion,
			create_date,
			due_date: due_date ? new Date(due_date).toISOString().split('T')[0].toString() : 'null'
		};

		fetch('https://todo-test-api-jelz.onrender.com/api/todo/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newTodo)
		})
			.then(() => {
				(window as Window).location = '/';
			})
			.catch(() => {
				return {
					status: 301,
					error: new Error('Could not create a new todo')
				};
			});
	}
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
<div class="text-center font-bold text-2xl text-white mb-3">Create a new task</div>
<hr class="w-80 mx-auto mb-5" />
<div>
	<img
		class="border-indigo-800 mx-auto w-52 border-4 grid place-items-center rounded-lg"
		src="https://www.premiumsvg.com/img_thumb/U-Fr1tCc9wFU7pFi8a5HbqMMepCJTuGduvF6L_ur3116m1.jpg"
		alt=""
	/>
</div>

<form
	class="mx-auto text-center grid place-items-center mb-10 text-rose-default text-xl"
	on:submit={handleSubmit}
>
	<div class="text-lg font-bold text-center text-white mb-2 mt-2">Title:</div>
	<input
		class="bg-gray-300 border-4 border-purple-400 rounded-lg text-rose-darker"
		bind:value={title}
		type="text"
		required
	/>

	<div class="text-lg font-bold text-center text-white mb-2 mt-2">Description:</div>
	<input
		class="border-4 bg-gray-300 border-pink-400 rounded-lg text-rose-darker"
		type="text"
		bind:value={description}
	/>

	<button
		class="text-white text-lg border-indigo-800 border-4 mt-10 rounded-lg py-1 px-1 font-bold hover:bg-slate-700"
		on:click={() => {
			showAndHideModal();
		}}
		type="submit">Create Todo</button
	>
</form>

<div class="mt-10 grid place-items-center mx-auto stroke-indigo-900 h-52">
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
			><title>Home icon</title><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline
				points="9 22 9 12 15 12 15 22"
			/></svg
		></a
	>
</div>

<!-- Modal -->

<Modal bind:showModal>
	<h2 class="font-bold text-3xl text-center grid place-items-center mx-auto" slot="header">
		New to-do has successfully been created!
	</h2>

	<ol class="definition-list text-lg font-bold text-gray-800">
		<li class="mb-2 mt-2">
			Your new to-do has been created! You will now be redirected back to the home page.
		</li>
		<li class="mb-5">Please click on the new to-do to edit or delete your new to-do.</li>
	</ol>
</Modal>
