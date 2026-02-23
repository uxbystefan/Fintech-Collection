<script lang="ts">
	import { ArrowLeft, X } from 'lucide-svelte';
	
	interface Props {
		title: string;
		onBack?: () => void;
		onClose?: () => void;
	}
	
	let { title, onBack, onClose }: Props = $props();
</script>

<header class="header">
	<button class="icon-button" aria-label="Go back" onclick={onBack}>
		<ArrowLeft size={24} />
	</button>
	<h2 class="header-title">{title}</h2>
	<button class="icon-button" aria-label="Close" onclick={onClose}>
		<X size={24} />
	</button>
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.875rem var(--padding-screen);
		gap: 1rem;
	}
	
	.header-title {
		flex: 1;
		text-align: center;
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}
	
	.icon-button {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--text-primary);
		border-radius: 50%;
		transition: background 200ms ease-out;
		flex-shrink: 0;
		cursor: pointer;
		border: none;
		background: transparent;
	}
	
	.icon-button:hover {
		background: var(--surface);
	}
</style>
