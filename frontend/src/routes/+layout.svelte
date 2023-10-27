<script>
	// @ts-nocheck

	import '../app.postcss';
	import Welcome from '$lib/components/Welcome.svelte';
</script>

<div class="app min-h-screen bg-gray-900 rounded-xl">
	<main class="h-screen">
		<slot />
	</main>
</div>
