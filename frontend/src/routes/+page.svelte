<script lang="ts">
	import { onMount } from 'svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import CheckedCircle from '$lib/components/CheckedCircle.svelte';
	import Fuse from 'fuse.js';
	import doit from '$lib/images/doit.gif';
	import profile from '$lib/images/profile.jpg';
	import Modal from '$lib/components/Modal.svelte';
	import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';
	export let data;
	let Todos = data.items;
	let showSidebar = false;
	let current_date: any = new Date();
	let showAlert = false;
	let showSearchbar = false;
	let dueTodos: any[] = [];
	const oneWeek = 24 * 60 * 60 * 1000 * 7;
	let searchPattern: any;
	let fuse: string | Fuse<unknown>;
	let searchresults: any[] = [];
	let searchableTodos: never[] = [];
	const searchOptions = {
		includeScore: true,
		threshold: 0.5,
		keys: ['title', 'description']
	};

	function displaySidebar() {
		showSidebar = !showSidebar;
		console.log("hello, I'm showing sidebar");
	}

	$: hasDueTodos = dueTodos.length > 0;

	// test zone
	import { todoStore, todoHandlers } from '$lib/stores/todoStore.js';

	let todolistfromfirestore = [];

	todoStore.subscribe((curr) => {
		console.log('This is data from todo stores', curr);
		todolistfromfirestore = curr?.todos;
		console.log('todolistfromfirestore', todolistfromfirestore);
		// displayName = curr?.currentUser?.displayName;
		// appointmentsScheduled = curr?.currentUser?.appointments.length;
	});
	let todoData = { title: 'todo title' };

	function createfirestoretodo() {
		todoHandlers.createtodo(todoData);
	}

	//

	function checkDueDate() {
		for (let todo of Todos) {
			if (
				todo.due_date !== null &&
				todo.completion !== true &&
				new Date(todo.due_date).getTime() <= Date.now() + oneWeek
			) {
				dueTodos.push(todo);
			}
		}
		for (let x of dueTodos) {
			let y = x.due_date;
			let val = checkDateStatus(y);
			x.condition = val;
		}
	}

	function checkDateStatus(dateArgument: any) {
		const targetDate: any = new Date(dateArgument);
		if (targetDate < current_date) {
			return 'Past Due:';
		} else if (Math.abs(targetDate - current_date) <= oneWeek) {
			return 'Upcoming:';
		} else {
			return 'NA';
		}
	}

	function search(Todos: any[] | readonly unknown[]) {
		fuse = new Fuse(Todos, searchOptions);
	}

	$: searchPattern && searchTodos();

	const searchTodos = () => {
		search(searchableTodos);
		if (fuse) {
			if (searchPattern) {
				const searchResult = fuse.search(searchPattern);
				const filteredTodos = searchResult.map((obj: { item: any }) => obj.item);
				searchresults = filteredTodos;
			} else {
				searchresults = [];
			}
		}
	};

	function updateCompletion(todo: { _id: any; completion: any }) {
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
				window.location.assign('/');
			})
			.catch((_err) => {
				_err = !_err;
			});
	}
	function alphabetsort() {
		let sortedTodos = [...Todos];
		sortedTodos.sort((a, b) => {
			const titleA = a.title.toUpperCase();
			const titleB = b.title.toUpperCase();

			if (titleA < titleB) {
				return -1;
			} else if (titleA > titleB) {
				return 1;
			} else {
				return 0;
			}
		});
		Todos = sortedTodos;
	}
	function defaultSort() {
		Todos = defaultTodos;
	}

	let defaultTodos = [];

	function dateSort() {
		let datedTodos = [...Todos];
		let null_list = [];
		let hasDate = [];
		for (let i of datedTodos) {
			if (i.due_date == 'null') {
				null_list.push(i);
			} else {
				hasDate.push(i);
			}
		}
		hasDate.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

		let datedList = hasDate.concat(null_list);
		Todos = datedList;
	}

	onMount(() => {
		searchableTodos = Todos;
		checkDueDate();
		defaultTodos = Todos;
	});
</script>

<div>
	<button type="button" on:click={createfirestoretodo} class="text-gray-300"
		>Test to create firestoretodo</button
	>
</div>

<div class="relative">
	{#if showSidebar}
		<div
			transition:slide
			class="absolute left-0 top-0 h-screen bg-gradient-to-r from-blue-700 to-slate-800 w-screen rounded-xl"
		>
			<div class="flex items-center justify-between px-8 py-6">
				<button type="button" class="text-white" on:click={displaySidebar}>
					<svg
						viewBox="0 0 24 24"
						height="35"
						width="35"
						focusable="false"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Navigation icon</title>
						<path
							d="M2.75 18h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.5h18.6-18.5zm0-6.5h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.5h18.6-18.5zm0-6.5h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.49h18.6-18.5z"
						/>
					</svg>
				</button>

				<div class="flex items-center">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img
						class="w-12 h-12 rounded-full border-2 border-white shadow-lg mr-4"
						src={profile}
						alt="Profile Image"
					/>
					<div class="text-white">
						<div class="font-bold text-xl">Jonathan Hwang</div>
						<div class="text-sm">Frontend Developer</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col items-center justify-center h-screen">
				<div class="py-2 px-4 bg-white bg-opacity-20 rounded-xl text-white font-bold text-lg mb-4">
					Profile Categories
				</div>
				<div class="flex flex-col items-center space-y-6 overflow-y-auto max-h-[70vh]">
					<div class="w-3/4 text-white">
						<h2 class="text-2xl font-bold mb-2">Biography Description</h2>
						<p class="text-lg">
							Jonathan Hwang is a passionate frontend developer with a strong focus on creating
							user-friendly and visually appealing web applications. He has a solid foundation in
							HTML, CSS, and JavaScript, along with experience in various frontend frameworks and
							libraries such as React and Vue.js. Jonathan enjoys working in collaborative
							environments and leveraging his problem-solving skills to deliver high-quality code.
							With a keen eye for design and a commitment to continuous learning, he strives to
							create engaging and innovative user experiences.
						</p>
					</div>

					<div class="w-3/4 text-white">
						<h2 class="text-2xl font-bold mb-2">Summary</h2>
						<p class="text-lg">
							Jonathan Hwang is a frontend developer specializing in building responsive and
							intuitive web applications. With a passion for clean code and attention to detail, he
							ensures high-quality user experiences. Jonathan has a strong understanding of modern
							web technologies and enjoys working on challenging projects that push the boundaries
							of frontend development. He is a proactive and collaborative team member who thrives
							in creative and dynamic environments.
						</p>
					</div>

					<div class="w-3/4 text-white">
						<h2 class="text-2xl font-bold mb-2">Interests and Achievements</h2>
						<ul class="list-disc pl-6 text-lg">
							<li>Winner of the "Best Web Design" award at the Tech Expo 2022</li>
							<li>Passionate about UX/UI design and creating visually appealing interfaces</li>
							<li>Enjoys solving complex coding challenges and finding elegant solutions</li>
							<li>Keeps up-to-date with the latest frontend technologies and trends</li>
							<li>Loves exploring new design frameworks and experimenting with creative layouts</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex flex-row justify-between text-white pt-8">
		<button type="button" on:click={displaySidebar} class="ml-8 mt-[-5px]">
			<svg class="fill-white" viewBox="0 0 24 24" height="35" width="35" focusable="false"
				><path
					d="M2.75 18h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.5h18.6-18.5zm0-6.5h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.5h18.6-18.5zm0-6.5h18.5a.75.75 0 0 1 .1 1.5H2.75a.75.75 0 0 1-.1-1.49h18.6-18.5z"
				/></svg
			>
		</button>
		<div class="flex flex-row gap-4 mr-8">
			<button
				on:click={() => {
					showSearchbar = !showSearchbar;
				}}
				class=""
				><svg class="fill-white" viewBox="0 0 16 16" height="25" width="25"
					><path
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
				type="button"
				on:click={() => {
					showAlert = !showAlert;
				}}
			>
				<svg
					viewBox="0 0 16 16"
					height="25"
					width="25"
					class={dueTodos.length > 0 ? 'fill-red-800' : 'fill-white'}
				>
					<path
						d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
					/>
				</svg>
			</button>
		</div>
	</div>
	{#if showAlert}
		<dialog
			class="rounded-xl text-indigo-800 w-80 min-h-20 max-h-56 overflow-hidden bg-pink-300 border-4 border-purple-950 overflow-y-auto mt-3"
			open
		>
			{#each dueTodos as notificationItem}
				{#if notificationItem.condition != 'NA'}
					<div
						class=" border rounded-xl text-white bg-indigo-800 mb-2 py-3 px-3 border-indigo-800 shadow-inner whitespace-nowrap"
					>
						<div class="flex flex-row gap-1 items-center">
							<!-- {#if notificationItem.condition == 'Past Due:'}
								<div />
							{:else if notificationItem.condition == 'Upcoming'}
								<div />
							{:else}
								<div />
							{/if} -->
							<div
								class="text-xs {notificationItem.condition == 'Past Due:'
									? 'text-red-600'
									: 'text-orange-400'} font-semibold"
							>
								{notificationItem.condition}
							</div>
							<div class="text-palette-lightgray">
								<a class="mt-1 text-white" href={`/${notificationItem._id}`}
									>{notificationItem.title}</a
								>
							</div>
						</div>
					</div>
				{/if}
			{/each}
			<!-- {#each dueTodos as result}
				<div
					class="border rounded-xl text-white bg-indigo-800 mb-2 py-3 px-3 border-indigo-800 shadow-inner whitespace-nowrap"
				>
					<a class="mt-1 text-white" href={`/${result._id}`}>{result.title}</a>
				</div>
			{/each} -->
		</dialog>
	{/if}

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

	<div class="flex flex-row justify-between w-full">
		<div class="text-white text-xs mb-2 ml-12 mt-12">LIST OF TASKS</div>
		<button class="text-white text-xs mb-2 mr-12 mt-12">SORT</button>
		<Dropdown class="bg-pink-400 rounded-sm">
			<DropdownItem
				><button class="text-black text-xs" on:click={defaultSort}>DEFAULT</button></DropdownItem
			>
			<DropdownItem
				><button class="text-black text-xs" on:click={alphabetsort}>ALPHABETICAL</button
				></DropdownItem
			>

			<DropdownItem
				><button class="text-black text-xs" on:click={dateSort}>DATE</button></DropdownItem
			>
		</Dropdown>
	</div>

	<div
		class="mx-auto grid grid-cols-1 content-start gap-1 place-items-center overflow-y-auto h-80 overflow-hidden"
	>
		{#each Todos as todo}
			<div
				class="border rounded-xl bg-indigo-800 w-80 mb-2 py-3 px-3 border-indigo-800 shadow-inner"
			>
				<div class="flex flex-row gap-3">
					<button
						type="button"
						on:click={() => {
							updateCompletion(todo);
						}}
					>
						<Checkbox {todo} completion={todo.completion} />
					</button>
					<a class="mt-1 text-white {todo.completion ? 'line-through' : ''}" href={`/${todo._id}`}
						>{todo.title}</a
					>
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
