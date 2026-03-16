<script lang="ts">
	import type { Insight } from '$lib/types';

	let { insights = [] }: { insights: Insight[] } = $props();

	const iconMap: Record<Insight['type'], string> = {
		positive: '▲',
		negative: '▼',
		warning: '◆',
		neutral: '●'
	};

	const colorMap: Record<Insight['type'], string> = {
		positive: 'var(--color-accent)',
		negative: 'var(--color-negative)',
		warning: 'var(--color-warning)',
		neutral: 'var(--color-primary)'
	};

	const bgMap: Record<Insight['type'], string> = {
		positive: 'var(--color-accent-muted)',
		negative: 'var(--color-negative-muted)',
		warning: 'var(--color-warning-muted)',
		neutral: 'var(--color-primary-muted)'
	};
</script>

<div class="card insights-card">
	<div class="header">
		<span class="label">AI Insights</span>
		<span class="badge badge--neutral">{insights.length} signals</span>
	</div>

	{#if insights.length === 0}
		<p class="empty">Enter your financial data to generate insights.</p>
	{:else}
		<ul class="insights-list" role="list">
			{#each insights as insight (insight.id)}
				<li class="insight-item" style="border-left-color: {colorMap[insight.type]}; background: {bgMap[insight.type]}15;">
					<div class="insight-icon" style="color: {colorMap[insight.type]}; background: {bgMap[insight.type]};">
						{iconMap[insight.type]}
					</div>
					<div class="insight-body">
						<span class="insight-title" style="color: {colorMap[insight.type]}">{insight.title}</span>
						<p class="insight-message">{insight.message}</p>
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.insights-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.empty {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		text-align: center;
		padding: var(--space-6) 0;
	}

	.insights-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.insight-item {
		display: flex;
		gap: var(--space-4);
		align-items: flex-start;
		padding: var(--space-4);
		border-radius: var(--radius-md);
		border-left: 3px solid transparent;
	}

	.insight-icon {
		width: 28px;
		height: 28px;
		border-radius: var(--radius-sm);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.625rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.insight-body {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.insight-title {
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.insight-message {
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
		line-height: 1.55;
	}
</style>
