<script lang="ts">
	import { Shield } from 'lucide-svelte';
	import ChecklistItem from './ChecklistItem.svelte';
	
	interface Props {
		isLoading?: boolean;
		accessibilityMode?: boolean;
		checklistItems?: string[];
	}
	
	let { 
		isLoading = false, 
		accessibilityMode = false,
		checklistItems = []
	}: Props = $props();
</script>

<div class="card" class:accessibility={accessibilityMode}>
	{#if isLoading}
		<!-- Loading State: Skeleton UI -->
		<div class="loading-skeleton">
			<div class="skeleton-icon"></div>
			<div class="skeleton-text skeleton-heading"></div>
			<div class="skeleton-text skeleton-paragraph"></div>
			<div class="skeleton-list">
				<div class="skeleton-item"></div>
				<div class="skeleton-item"></div>
				<div class="skeleton-item"></div>
			</div>
		</div>
	{:else}
		<!-- Default, Pressed, and Accessibility States -->
		<div class="icon-container" class:accessibility={accessibilityMode}>
			<Shield size={32} strokeWidth={2} />
		</div>
		
		<h1 class="heading" class:accessibility={accessibilityMode}>Verify your identity</h1>
		
		<p class="description" class:accessibility={accessibilityMode}>
			To comply with banking regulations and secure your funds, we need to verify your information.
		</p>
		
		<ul class="checklist" class:accessibility={accessibilityMode}>
			{#each checklistItems as item}
				<ChecklistItem text={item} {accessibilityMode} />
			{/each}
		</ul>
	{/if}
</div>

<style>
	.card {
		background: var(--surface);
		border-radius: var(--radius-card);
		padding: var(--padding-card);
		border: 1px solid var(--border-subtle);
		box-shadow: var(--card-shadow);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-stack);
	}
	
	.card.accessibility {
		padding: 28px;
		gap: 20px;
	}
	
	/* Icon Container */
	.icon-container {
		width: 64px;
		height: 64px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
		border-radius: 50%;
		color: var(--primary);
	}
	
	.icon-container.accessibility {
		width: 72px;
		height: 72px;
	}
	
	/* Heading */
	.heading {
		text-align: center;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}
	
	.heading.accessibility {
		font-size: 1.75rem;
	}
	
	/* Description */
	.description {
		text-align: center;
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin: 0;
	}
	
	.description.accessibility {
		font-size: 1.0625rem;
		color: var(--text-primary);
		line-height: 1.7;
	}
	
	/* Checklist */
	.checklist {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-small);
	}
	
	.checklist.accessibility {
		gap: 16px;
	}
	
	/* Loading Skeleton */
	.loading-skeleton {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-stack);
		align-items: center;
	}
	
	.skeleton-icon {
		width: 64px;
		height: 64px;
		background: linear-gradient(
			90deg,
			var(--surface-elevated) 25%,
			var(--border-subtle) 50%,
			var(--surface-elevated) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 50%;
	}
	
	.skeleton-text {
		height: 20px;
		background: linear-gradient(
			90deg,
			var(--surface-elevated) 25%,
			var(--border-subtle) 50%,
			var(--surface-elevated) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 6px;
	}
	
	.skeleton-heading {
		width: 200px;
		height: 24px;
	}
	
	.skeleton-paragraph {
		width: 100%;
		margin-bottom: 8px;
	}
	
	.skeleton-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-small);
	}
	
	.skeleton-item {
		height: 24px;
		background: linear-gradient(
			90deg,
			var(--surface-elevated) 25%,
			var(--border-subtle) 50%,
			var(--surface-elevated) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: 6px;
	}
	
	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
</style>
