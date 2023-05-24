<script>
	import { onMount } from 'svelte';
	let checked = false;

	function toggleCheckbox() {
		checked = !checked;
	}
	onMount(() => {});
</script>

<label class="inline-flex items-center">
	<input type="checkbox" class="hidden" bind:checked />
	<svg
		viewBox="0 0 24 24"
		height="33"
		width="33"
		focusable="false"
		role="img"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		stroke="currentColor"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="stroke-cyan-500"><title>Circle icon</title><circle cx="12" cy="12" r="10" /></svg
	>
</label>
