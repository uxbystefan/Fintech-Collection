<script lang="ts">
	import { TrendingUp, TrendingDown, DollarSign, Activity, Users, ShieldAlert } from 'lucide-svelte';

	const metrics = [
		{
			label: 'TOTAL REVENUE',
			value: '$1,248,500',
			change: '+12.5%',
			period: 'vs last month',
			isPositive: true,
			icon: DollarSign,
			hasInfo: true
		},
		{
			label: 'VOLUME',
			value: '45,212',
			change: '+6.2%',
			period: 'vs last month',
			isPositive: true,
			icon: Activity
		},
		{
			label: 'SUCCESS RATE',
			value: '99.8%',
			change: '+0.3%',
			period: 'vs past mean',
			isPositive: true,
			icon: TrendingUp
		},
		{
			label: 'ACTIVE USERS',
			value: '12,410',
			change: '+53.6%',
			period: 'new signups',
			isPositive: true,
			icon: Users
		},
		{
			label: 'FRAUD ALERTS',
			value: '3',
			change: '+2.1%',
			period: 'high priority',
			isPositive: false,
			icon: ShieldAlert
		}
	];
</script>

<div class="metrics-grid">
	{#each metrics as metric}
		<div class="metric-card">
			<div class="metric-header">
				<span class="metric-label">{metric.label}</span>
				{#if metric.hasInfo}
					<button class="info-btn" title="More information">
						<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
							<circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1.5"/>
							<path d="M7 10V7M7 4.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
						</svg>
					</button>
				{/if}
			</div>
			
			<div class="metric-value">{metric.value}</div>
			
			<div class="metric-footer">
				<span class="metric-change" class:positive={metric.isPositive} class:negative={!metric.isPositive}>
					{#if metric.isPositive}
						<TrendingUp size={14} />
					{:else}
						<TrendingDown size={14} />
					{/if}
					{metric.change}
				</span>
				<span class="metric-period">{metric.period}</span>
			</div>
		</div>
	{/each}
</div>

<style>
	.metrics-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
		gap: 1.25rem;
	}

	.metric-card {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.metric-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.metric-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text-secondary);
		letter-spacing: 0.05em;
	}

	.info-btn {
		background: none;
		border: none;
		color: var(--color-text-secondary);
		padding: 0;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: color 0.2s;
	}

	.info-btn:hover {
		color: var(--color-accent);
	}

	.metric-value {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text-primary);
	}

	.metric-footer {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
	}

	.metric-change {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		font-weight: 600;
	}

	.metric-change.positive {
		color: var(--color-success);
	}

	.metric-change.negative {
		color: var(--color-danger);
	}

	.metric-period {
		color: var(--color-text-secondary);
	}
</style>
