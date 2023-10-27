<script lang="ts">
	let enteredSite = false;

	function enterSite() {
		enteredSite = true;
	}
</script>

<div class="">
	<h1>Welcome to Your Todo App</h1>
	<p>For the best experience, please view this app in mobile mode</p>
	<button
		class="px-2 py-1 rounded-md bg-white hover:bg-slate-300"
		type="button"
		on:click={enterSite}>Enter</button
	>
</div>
