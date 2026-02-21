<script lang="ts">
	import { TrendingUp } from 'lucide-svelte';

	const metrics = [
		{
			label: 'TOTAL PROCESSED VOLUME',
			value: '$142.8M'
		},
		{
			label: 'SUCCESS RATE',
			value: '99.82%',
			trend: 'up',
			labelColor: 'green'
		},
		{
			label: 'FLAGGED',
			value: '12',
			labelColor: 'orange'
		},
		{
			label: 'FAILED',
			value: '4',
			labelColor: 'red'
		},
		{
			label: 'AVG PROCESSING TIME',
			value: '142ms',
			labelColor: 'blue'
		}
	];
</script>

<div class="metrics-container">
	{#each metrics as metric, i}
		<div class="metric-item">
			<div class="metric-label" class:orange={metric.labelColor === 'orange'} class:red={metric.labelColor === 'red'} class:blue={metric.labelColor === 'blue'} class:green={metric.labelColor === 'green'}>
				{metric.label}
			</div>
			<div class="metric-value-row">
				<div class="metric-value">{metric.value}</div>
				{#if metric.trend === 'up'}
					<TrendingUp size={20} class="trend-icon" />
				{/if}
			</div>
		</div>
		{#if i < metrics.length - 1}
			<div class="divider"></div>
		{/if}
	{/each}
</div>

<style>
	.metrics-container {
		display: flex;
		align-items: center;
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		padding: 1.5rem 2rem;
	}

	.metric-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.divider {
		width: 1px;
		height: 60px;
		background-color: var(--color-border);
		margin: 0 2rem;
	}

	.metric-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.metric-label.orange {
		color: #f59e0b;
	}

	.metric-label.red {
		color: #ef4444;
	}

	.metric-label.blue {
		color: #3b82f6;
	}

	.metric-label.green {
		color: #22c55e;
	}

	.metric-value-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.metric-value {
		font-size: 1.875rem;
		font-weight: 700;
		color: var(--color-text-primary);
	}

	.metric-value-row :global(.trend-icon) {
		color: #22c55e;
	}
</style>

