<script lang="ts">
	import { Check } from 'lucide-svelte';
	
	interface Props {
		text: string;
		accessibilityMode?: boolean;
	}
	
	let { text, accessibilityMode = false }: Props = $props();
</script>

<li class="checklist-item" class:accessibility={accessibilityMode}>
	<div class="check-icon" class:accessibility={accessibilityMode}>
		<Check size={14} strokeWidth={3} />
	</div>
	<span>{text}</span>
</li>

<style>
	.checklist-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-small);
		color: var(--text-primary);
		font-size: 0.9375rem;
		list-style: none;
	}
	
	.checklist-item.accessibility {
		font-size: 1rem;
	}
	
	.check-icon {
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--success);
		color: white;
		border-radius: 50%;
	}
	
	.check-icon.accessibility {
		width: 28px;
		height: 28px;
	}
</style>
