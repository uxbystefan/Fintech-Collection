<script lang="ts">
	import { formatCurrency } from '$lib/finance';

	let {
		netWorth = 0,
		totalAssets = 0,
		totalLiabilities = 0,
		debtRatio = 0
	}: {
		netWorth: number;
		totalAssets: number;
		totalLiabilities: number;
		debtRatio: number;
	} = $props();

	const isPositive = $derived(netWorth >= 0);
	const maxBar = $derived(Math.max(totalAssets, totalLiabilities, 1));
</script>

<div class="card">
	<div class="header">
		<span class="label">Net Worth Overview</span>
		<span
			class="badge"
			class:badge--positive={isPositive}
			class:badge--negative={!isPositive}
		>
			{isPositive ? '▲' : '▼'}
			{isPositive ? 'Positive' : 'Negative'}
		</span>
	</div>

	<div class="net-worth-row">
		<div class="net-worth-figure">
			<span class="nw-label">Net Worth</span>
			<span class="nw-value metric-value" style="color: {isPositive ? 'var(--color-accent)' : 'var(--color-negative)'}">
				{formatCurrency(netWorth)}
			</span>
		</div>
	</div>

	<div class="bars">
		<!-- Assets bar -->
		<div class="bar-group">
			<div class="bar-meta">
				<span class="bar-label">Total Assets</span>
				<span class="bar-value metric-value">{formatCurrency(totalAssets)}</span>
			</div>
			<div class="bar-track">
				<div
					class="bar-fill bar-fill--asset"
					style="width: {(totalAssets / maxBar) * 100}%"
				></div>
			</div>
		</div>

		<!-- Liabilities bar -->
		<div class="bar-group">
			<div class="bar-meta">
				<span class="bar-label">Total Liabilities</span>
				<span class="bar-value metric-value">{formatCurrency(totalLiabilities)}</span>
			</div>
			<div class="bar-track">
				<div
					class="bar-fill bar-fill--liability"
					style="width: {(totalLiabilities / maxBar) * 100}%"
				></div>
			</div>
		</div>
	</div>

	<div class="stats-row">
		<div class="stat">
			<span class="stat-label">Debt Ratio</span>
			<span
				class="stat-value metric-value"
				style="color: {debtRatio > 0.4 ? 'var(--color-negative)' : debtRatio > 0.2 ? 'var(--color-warning)' : 'var(--color-accent)'}"
			>
				{(debtRatio * 100).toFixed(1)}%
			</span>
		</div>
		<div class="stat">
			<span class="stat-label">Asset Coverage</span>
			<span class="stat-value metric-value">
				{totalLiabilities > 0 ? (totalAssets / totalLiabilities).toFixed(2) + 'x' : '—'}
			</span>
		</div>
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: var(--space-5);
	}

	.net-worth-row {
		margin-bottom: var(--space-6);
	}

	.net-worth-figure {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.nw-label {
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.nw-value {
		font-size: 2rem;
		line-height: 1.1;
	}

	.bars {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		margin-bottom: var(--space-6);
	}

	.bar-group {}

	.bar-meta {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: var(--space-2);
	}

	.bar-label {
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
	}

	.bar-value {
		font-size: 0.875rem;
		color: var(--color-text-primary);
	}

	.bar-track {
		height: 8px;
		background: var(--color-border);
		border-radius: 999px;
		overflow: hidden;
	}

	.bar-fill {
		height: 100%;
		border-radius: 999px;
		transition: width 0.5s ease;
	}

	.bar-fill--asset {
		background: var(--color-accent);
	}

	.bar-fill--liability {
		background: var(--color-negative);
	}

	.stats-row {
		display: flex;
		gap: var(--space-8);
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-4);
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.stat-label {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.stat-value {
		font-size: 1.125rem;
		color: var(--color-text-primary);
	}
</style>
