<script>
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="mobile-container">
	{@render children()}
</div>
