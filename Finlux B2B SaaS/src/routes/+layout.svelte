<script>
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
	
	let { children } = $props();
</script>

<div class="app-container">
	<Sidebar />
	<div class="main-content">
		<Header />
		<main>
			{@render children()}
		</main>
	</div>
</div>

<style>
	.app-container {
		display: flex;
		height: 100vh;
		overflow: hidden;
	}
	
	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	
	main {
		flex: 1;
		overflow-y: auto;
		padding: 2rem;
		background-color: var(--color-bg-primary);
	}
</style>
