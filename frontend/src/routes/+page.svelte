<script>
	import { onMount } from 'svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import CheckedCircle from '$lib/components/CheckedCircle.svelte';
	export let data;
	import Fuse from 'fuse.js';
	console.log('this is my data', data);
	let Todos = data.items;
	import doit from '$lib/images/doit.gif';
	import profile from '$lib/images/profile.jpg';
	import Modal from '$lib/components/Modal.svelte';
	let showSidebar = false;
	function displaySidebar() {
		showSidebar = !showSidebar;
	}

	//alert creation
	//To creat alert function, a list needs to be created with todo's who's completion date is upcoming (say, within 1 week). First, need to create
	//parameters for todo's to have start and end dates. Then, create a list of todo completions within 1 week, and then display those on click
	//of the alert button. Click on the list of todo's from that button should send you to the todo page to mark the todo as complete or update
	//the end date.
	//need to create a function to also "complete" a todo and update the database to mark it as such.
	let showAlert = false;

	//start test
	let showSearchbar = false;

	let searchPattern;
	let fuse;
	let searchresults = [];
	let searchableTodos = [];
	const searchOptions = {
		includeScore: true,
		threshold: 0.5, // value 0 is very strict, value 1 is not strict, .6 is the default,
		keys: ['title', 'description']
	};
	function search(Todos) {
		fuse = new Fuse(Todos, searchOptions);
	}

	$: searchPattern && searchTodos();
	const searchTodos = () => {
		console.log(searchresults);
		search(searchableTodos);
		if (fuse) {
			if (searchPattern) {
				const searchResult = fuse.search(searchPattern);
				const filteredTodos = searchResult.map((obj) => obj.item);
				searchresults = filteredTodos;
			} else {
				searchresults = [];
			}
		}
	};

	//Completion function

	function updateCompletion(todo) {
		console.log(todo);
		fetch(`https://todo-test-api-jelz.onrender.com/api/todo/${todo._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				completion: !todo.completion
			})
		})
			.then((_res) => {
				window.location = '/';
			})
			.catch((_err) => {
				_err = !_err;
			});
	}

	onMount(() => {
		Todos = Todos;
		searchableTodos = Todos;
	});
</script>

<!-- <header>NavBar</header> -->
<div class="relative">
	{#if showSidebar}
		<div transition:slide class="absolute left-0 top-0 h-screen bg-slate-800 w-screen rounded-xl">
			<button class="p-8" on:click={displaySidebar}
				><svg
					viewBox="0 0 24 24"
					height="35"
					width="35"
					focusable="false"
					role="img"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					class="text-slate-300"
					><title>Navigation icon</title><path
						d="M2.75 18h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.5h18.6-18.5zm0-6.5h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.5h18.6-18.5zm0-6.5h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.49h18.6-18.5z"
					/></svg
				></button
			>

			<div class="absolute right-0 p-8">
				<img
					class="rounded-full aspect-square w-[90px] border-2 border-white shadow-white/50 shadow-lg justify"
					src={profile}
					alt=""
				/>
			</div>
			<div class=" flex-row right-0">
				<div class="text-slate-300">Jonathan Hwang</div>
				<div class="text-slate-300">airgearfreak@gmail.com</div>
			</div>
			<div class="text-slate-300 mx-auto place-items-center grid flex-col min-h-screen">
				<div class="border-4 rounded-xl py-2 px-2 border-black bg-slate-700">Logout</div>
			</div>
		</div>
	{/if}
	<div class="flex flex-row justify-between text-white pt-8">
		<button on:click={displaySidebar} class="ml-8 mt-[-5px]"
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
		<div class="flex flex-row gap-4 mr-8">
			<button
				on:click={() => {
					showSearchbar = !showSearchbar;
				}}
				class=""
				><svg
					viewBox="0 0 16 16"
					height="25"
					width="25"
					focusable="false"
					role="img"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					class="StyledIconBase-sc-ea9ulj-0 hRnJPC"
					><title>Search icon</title><path
						d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
					/></svg
				></button
			>
			{#if showSearchbar}
				<input
					class="text-black py-0"
					type="text"
					bind:value={searchPattern}
					on:input={searchTodos}
					name=""
				/>
			{/if}
			<button
				on:click={() => {
					showAlert = !showAlert;
				}}
				class=""
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

	{#if showSearchbar}
		<dialog
			on:mouseleave={() => {
				showSearchbar = false;
			}}
			class="rounded-xl text-indigo-800 w-80 min-h-20 max-h-56 overflow-hidden bg-pink-300 border-4 border-purple-950 overflow-y-auto mt-3"
			open
		>
			{#each searchresults as result}
				<div
					class="border rounded-xl text-white bg-indigo-800 mb-2 py-3 px-3 border-indigo-800 shadow-inner whitespace-nowrap"
				>
					<a class="mt-1 text-white" href={`/${result._id}`}>{result.title}</a>
				</div>
			{/each}
		</dialog>
	{/if}

	<h1 class="text-white text-3xl font-bold p-3 ml-6">What's up, Jonathan!</h1>
	<div class="ml-12 text-white text-xs mt-5 mb-2">FEATURED MESSAGE</div>

	<div class="mx-auto w-80 border-4 border-indigo-800 rounded-xl overflow-hidden">
		<img src={doit} alt="" />
	</div>

	<!-- <div class="text-white text-sm">Sidescrolling list of featured classes</div> -->
	<div class="text-white text-xs mb-2 ml-12 mt-12">LIST OF TASKS</div>
	<div
		class="mx-auto grid grid-cols-1 content-start gap-1 place-items-center overflow-y-auto h-80 overflow-hidden"
	>
		{#each Todos as todo}
			<div
				class="border rounded-xl bg-indigo-800 w-80 mb-2 py-3 px-3 border-indigo-800 shadow-inner"
			>
				<div class="flex flex-row gap-3">
					<button type="button" on:click={updateCompletion(todo)}>
						<Checkbox {todo} />
					</button>
					<a class="mt-1 text-white {todo.completion ? 'line-through' : ''}" href={`/${todo._id}`}
						>{todo.title}</a
					>

					<!-- <p class="grid place-items-center mb-3 text-rose-default text-center">{todo.description}</p> -->
				</div>
			</div>
		{/each}
	</div>
	<div>
		<div class="w-full flex flex-row justify-end pr-8 pt-4">
			<button
				on:click={() => {
					goto('/new_todo');
				}}
				><svg
					viewBox="0 0 16 16"
					focusable="false"
					role="img"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
					class="fill-pink-400 h-12 w-12"
					><title>PlusCircleFill icon</title><path
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
					/></svg
				></button
			>
		</div>
	</div>
</div>
