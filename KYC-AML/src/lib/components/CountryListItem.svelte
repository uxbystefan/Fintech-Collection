<script lang="ts">
	import { Check } from 'lucide-svelte';
	
	interface Props {
		country: {
			name: string;
			code: string;
			flag: string;
		};
		selected: boolean;
		onClick: () => void;
	}
	
	let { country, selected, onClick }: Props = $props();
</script>

<button class="country-item" class:selected onclick={onClick}>
	<div class="country-info">
		<span class="flag">{country.flag}</span>
		<div class="country-text">
			<span class="country-name">{country.name}</span>
			<span class="country-code">{country.code}</span>
		</div>
	</div>
	<div class="radio-indicator" class:selected>
		{#if selected}
			<Check size={14} strokeWidth={3} />
		{/if}
	</div>
</button>

<style>
	.country-item {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.875rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-button);
		cursor: pointer;
		transition: all 200ms ease-out;
		text-align: left;
	}
	
	.country-item:hover {
		border-color: var(--primary);
		background: var(--surface-elevated);
	}
	
	.country-item.selected {
		border-color: var(--primary);
		background: rgba(59, 130, 246, 0.05);
	}
	
	.country-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
	
	.flag {
		font-size: 1.5rem;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		background: var(--surface-elevated);
	}
	
	.country-text {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}
	
	.country-name {
		color: var(--text-primary);
		font-size: 0.9375rem;
		font-weight: 500;
	}
	
	.country-code {
		color: var(--text-muted);
		font-size: 0.75rem;
		text-transform: uppercase;
	}
	
	.radio-indicator {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid var(--border-input);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 200ms ease-out;
		flex-shrink: 0;
	}
	
	.radio-indicator.selected {
		background: var(--primary);
		border-color: var(--primary);
		color: white;
	}
</style>
