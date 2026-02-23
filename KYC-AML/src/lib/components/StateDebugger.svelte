<script lang="ts">
	interface Props {
		currentState: string;
		onStateChange: (state: any) => void;
		states?: { value: string; label: string }[];
	}
	
	let { currentState, onStateChange, states }: Props = $props();
	
	// Default states if not provided
	const defaultStates = [
		{ value: 'default', label: 'Default' },
		{ value: 'pressed', label: 'Pressed' },
		{ value: 'loading', label: 'Loading' },
		{ value: 'accessibility', label: 'Accessibility' }
	];
	
	let stateOptions = $derived(states || defaultStates);
</script>

<div class="state-switcher">
	{#each stateOptions as state}
		<button 
			class:active={currentState === state.value} 
			onclick={() => onStateChange(state.value)}
		>
			{state.label}
		</button>
	{/each}
</div>

<style>
	.state-switcher {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		background: rgba(0, 0, 0, 0.95);
		padding: 0.5rem;
		gap: 0.5rem;
		z-index: 1000;
		border-bottom: 1px solid var(--border-subtle);
	}
	
	.state-switcher button {
		flex: 1;
		padding: 0.5rem;
		border-radius: 8px;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-secondary);
		background: transparent;
		border: 1px solid var(--border-subtle);
		transition: all 200ms ease-out;
		cursor: pointer;
	}
	
	.state-switcher button.active {
		background: var(--primary);
		color: white;
		border-color: var(--primary);
	}
	
	.state-switcher button:hover:not(.active) {
		border-color: var(--primary);
		color: var(--text-primary);
	}
</style>
