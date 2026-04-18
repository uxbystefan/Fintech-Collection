<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="app-shell">
	{@render children()}
</div>

<style>
	.app-shell {
		width: 100%;
		min-height: 100vh;
		background: #0B0B0F;
	}
</style>
