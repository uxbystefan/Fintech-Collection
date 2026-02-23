<script lang="ts">
	import { Search, X } from 'lucide-svelte';
	
	interface Props {
		value: string;
		placeholder?: string;
		onInput: (value: string) => void;
		onClear?: () => void;
	}
	
	let { value = $bindable(), placeholder = 'Search', onInput, onClear }: Props = $props();
	
	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		onInput(target.value);
	}
	
	function handleClear() {
		value = '';
		onClear?.();
	}
</script>

<div class="search-container">
	<Search size={18} class="search-icon" />
	<input
		type="text"
		class="search-input"
		{placeholder}
		{value}
		oninput={handleInput}
	/>
	{#if value}
		<button class="clear-button" onclick={handleClear} aria-label="Clear search">
			<X size={18} />
		</button>
	{/if}
</div>

<style>
	.search-container {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border-input);
		border-radius: var(--radius-input);
		transition: all 200ms ease-out;
	}
	
	.search-container:focus-within {
		border-color: var(--primary);
		background: var(--surface-elevated);
	}
	
	.search-container :global(.search-icon) {
		color: var(--text-muted);
		flex-shrink: 0;
	}
	
	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: var(--text-primary);
		font-size: 0.9375rem;
		font-family: var(--font-body);
	}
	
	.search-input::placeholder {
		color: var(--text-muted);
	}
	
	.clear-button {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.25rem;
		color: var(--text-muted);
		background: transparent;
		border: none;
		border-radius: 50%;
		cursor: pointer;
		transition: all 200ms ease-out;
		flex-shrink: 0;
	}
	
	.clear-button:hover {
		color: var(--text-primary);
		background: var(--surface-elevated);
	}
</style>
