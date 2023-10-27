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
			<h1>Welcome to Your Todo App</h1>
			<p>For the best experience, please view this app in mobile mode</p>
			<button
				class="px-2 py-1 rounded-md bg-white hover:bg-slate-300"
				type="button"
				on:click={enterSite}>Enter</button
			>
		</div>
	{/if}
</div>
