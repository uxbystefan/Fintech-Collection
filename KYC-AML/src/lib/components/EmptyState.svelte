<script lang="ts">
	import { SearchX, AlertCircle } from 'lucide-svelte';
	
	interface Props {
		searchQuery: string;
		commonSearches?: string[];
		onCommonSearchClick?: (search: string) => void;
		showSupportNote?: boolean;
	}
	
	let { searchQuery, commonSearches = [], onCommonSearchClick, showSupportNote = false }: Props = $props();
</script>

<div class="empty-state">
	<div class="empty-icon">
		<SearchX size={40} strokeWidth={1.5} />
	</div>
	
	<h3 class="empty-title">No results found</h3>
	
	<p class="empty-message">
		We couldn't find any country matching <strong>"{searchQuery}"</strong>. Please try another search.
	</p>
	
	{#if commonSearches.length > 0}
		<div class="common-searches">
			<span class="common-label">COMMON SEARCHES</span>
			<div class="common-tags">
				{#each commonSearches as search}
					<button class="common-tag" onclick={() => onCommonSearchClick?.(search)}>
						{search}
					</button>
				{/each}
			</div>
		</div>
	{/if}
	
	{#if showSupportNote}
		<div class="support-note">
			<AlertCircle size={16} />
			<p>
				If your country is not listed, we may not support operations in your region yet. Contact support for more information.
			</p>
		</div>
	{/if}
</div>

<style>
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem 0;
		text-align: center;
	}
	
	.empty-icon {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--surface);
		border-radius: 50%;
		color: var(--text-muted);
		margin-bottom: 1rem;
	}
	
	.empty-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 0.5rem 0;
	}
	
	.empty-message {
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin: 0 0 1.5rem 0;
		max-width: 320px;
	}
	
	.empty-message strong {
		color: var(--primary);
	}
	
	.common-searches {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
		margin-bottom: 1rem;
	}
	
	.common-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--text-muted);
	}
	
	.common-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		justify-content: center;
	}
	
	.common-tag {
		padding: 0.5rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-full);
		color: var(--text-secondary);
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 200ms ease-out;
	}
	
	.common-tag:hover {
		border-color: var(--primary);
		color: var(--text-primary);
		background: var(--surface-elevated);
	}
	
	.support-note {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 0.875rem 1rem;
		background: rgba(59, 130, 246, 0.05);
		border-radius: var(--radius-button);
		border: 1px solid rgba(59, 130, 246, 0.1);
		color: var(--text-secondary);
		font-size: 0.8125rem;
		line-height: 1.5;
		text-align: left;
		max-width: 100%;
	}
	
	.support-note :global(svg) {
		color: var(--primary);
		flex-shrink: 0;
		margin-top: 0.125rem;
	}
	
	.support-note p {
		margin: 0;
	}
</style>
