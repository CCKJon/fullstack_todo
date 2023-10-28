<script>
	// @ts-nocheck
	import '../app.postcss';
	let enteredSite = false;

	function enterSite() {
		enteredSite = true;
	}
</script>

<div>
	{#if enteredSite == true}
		<div class="app min-h-screen bg-gray-900 rounded-xl">
			<main class="h-screen">
				<slot />
			</main>
		</div>
	{:else}
		<div class="app min-h-screen bg-gray-900 rounded-xl">
			<div class="py-40">
				<h1 class="text-gray-300 flex flex-row justify-center text-xl">Welcome to Your Todo App</h1>
				<p class="text-gray-400 py-5 flex flex-row justify-center">
					For the best experience, please use mobile view
				</p>
				<div class="flex flex-row justify-center py-96">
					<button
						class="px-2 py-1 rounded-md bg-pink-400 hover:bg-pink-300"
						type="button"
						on:click={enterSite}>Enter</button
					>
				</div>
			</div>
		</div>
	{/if}
</div>
