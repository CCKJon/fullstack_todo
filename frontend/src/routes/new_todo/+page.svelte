<script>
	import { goto } from '$app/navigation';
	import Modal from '$lib/components/Modal.svelte';

	// let showCreateTodoModal = false;
	let showModal = false;
	let title = '';
	let description = '';
	let todo = '';

	function showAndHideModal() {
		showModal = true; // Show the modal

		setTimeout(() => {
			showModal = false; // Hide the modal after the delay
			window.location = '/'; // Redirect to the desired location
		}, 3000); // Specify the delay in milliseconds (e.g., 3000ms = 3 seconds)
	}

	function handleSubmit(event) {
		event.preventDefault();

		const newTodo = {
			title,
			description
		};

		fetch('http://127.0.0.1:8000/api/todo/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newTodo)
		})
			// .then((response) => {
			// 	// Handle response

			// 	window.location = '/';
			// })
			.catch((error) => {
				// Handle error
			});
	}
</script>

<div class="mx-auto text-center grid place-items-center text-2xl font-bold text-rose-lighter mb-5">
	Hello, this is where you can create a new To-Do!
</div>

<form
	class="mx-auto text-center grid place-items-center mb-10 text-rose-default text-xl"
	on:submit={handleSubmit}
>
	Title:
	<input
		class="bg-gray-300 border-4 border-rose-lighter rounded-lg text-rose-darker"
		bind:value={title}
		type="text"
		required
	/>

	Description:
	<input
		class="border-4 bg-gray-300 border-rose-lighter rounded-lg text-rose-darker"
		type="text"
		bind:value={description}
	/>

	<button
		class="text-rose-default border-rose-default border-4 mt-3 rounded-lg py-1 px-1 font-bold hover:bg-slate-700"
		on:click={() => {
			showAndHideModal();
		}}
		type="submit">Create Todo</button
	>
</form>

<div>
	<img
		class="border-rose-default mx-auto w-72 border-4 grid place-items-center rounded-lg"
		src="https://www.premiumsvg.com/img_thumb/U-Fr1tCc9wFU7pFi8a5HbqMMepCJTuGduvF6L_ur3116m1.jpg"
		alt=""
	/>
</div>

<div class="mt-10">
	<a
		class="font-bold text-xl text-center grid place-item-center mx-auto px-2 py-1 hover:bg-slate-700 text-rose-default border-rose-default border-4 rounded-xl w-20"
		href="/">Home</a
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
