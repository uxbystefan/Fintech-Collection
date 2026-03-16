<script lang="ts">
	import type { ScoreBreakdown } from '$lib/types';

	let {
		score = 0,
		breakdown = {
			savingsRateScore: 0,
			debtRatioScore: 0,
			emergencyFundScore: 0,
			investmentScore: 0
		}
	}: { score: number; breakdown: ScoreBreakdown } = $props();

	const color = $derived(
		score >= 75
			? 'var(--color-accent)'
			: score >= 50
				? 'var(--color-primary)'
				: score >= 25
					? 'var(--color-warning)'
					: 'var(--color-negative)'
	);

	const label = $derived(
		score >= 75 ? 'Excellent' : score >= 50 ? 'Good' : score >= 25 ? 'Fair' : 'Needs Attention'
	);

	const circumference = 2 * Math.PI * 54;
	const dashOffset = $derived(circumference - (score / 100) * circumference);

	const breakdownItems = [
		{ key: 'savingsRateScore', label: 'Savings Rate', weight: 30 },
		{ key: 'debtRatioScore', label: 'Debt Ratio', weight: 30 },
		{ key: 'emergencyFundScore', label: 'Emergency Fund', weight: 20 },
		{ key: 'investmentScore', label: 'Investment Mix', weight: 20 }
	] as const;
</script>

<div class="card health-card">
	<div class="card-header">
		<span class="label">Financial Health Score</span>
	</div>

	<div class="score-body">
		<div class="gauge-wrap">
			<svg viewBox="0 0 120 120" class="gauge" aria-hidden="true">
				<circle cx="60" cy="60" r="54" fill="none" stroke="var(--color-border)" stroke-width="10" />
				<circle
					cx="60"
					cy="60"
					r="54"
					fill="none"
					stroke={color}
					stroke-width="10"
					stroke-linecap="round"
					stroke-dasharray={circumference}
					stroke-dashoffset={dashOffset}
					transform="rotate(-90 60 60)"
					style="transition: stroke-dashoffset 0.6s ease, stroke 0.4s ease;"
				/>
			</svg>
			<div class="gauge-inner">
				<span class="score-number metric-value" style="color: {color}">{score}</span>
				<span class="score-denom">/100</span>
				<span class="score-label" style="color: {color}">{label}</span>
			</div>
		</div>

		<div class="breakdown">
			{#each breakdownItems as item}
				<div class="breakdown-row">
					<span class="breakdown-label">{item.label}</span>
					<div class="breakdown-bar-wrap">
						<div
							class="breakdown-bar"
							style="width: {(breakdown[item.key] / item.weight) * 100}%; background: {color};"
						></div>
					</div>
					<span class="breakdown-score metric-value"
						>{breakdown[item.key]}<span class="breakdown-max">/{item.weight}</span></span
					>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.health-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.score-body {
		display: flex;
		align-items: center;
		gap: var(--space-8);
		flex-wrap: wrap;
	}

	.gauge-wrap {
		position: relative;
		width: 140px;
		height: 140px;
		flex-shrink: 0;
	}

	.gauge {
		width: 100%;
		height: 100%;
	}

	.gauge-inner {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
	}

	.score-number {
		font-size: 2.25rem;
		line-height: 1;
	}

	.score-denom {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.score-label {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-top: 2px;
	}

	.breakdown {
		flex: 1;
		min-width: 200px;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.breakdown-row {
		display: grid;
		grid-template-columns: 130px 1fr 48px;
		align-items: center;
		gap: var(--space-3);
	}

	.breakdown-label {
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
		white-space: nowrap;
	}

	.breakdown-bar-wrap {
		height: 5px;
		background: var(--color-border);
		border-radius: 999px;
		overflow: hidden;
	}

	.breakdown-bar {
		height: 100%;
		border-radius: 999px;
		transition: width 0.5s ease;
	}

	.breakdown-score {
		font-size: 0.8125rem;
		text-align: right;
		color: var(--color-text-primary);
	}

	.breakdown-max {
		font-size: 0.6875rem;
		color: var(--color-text-muted);
		font-weight: 400;
	}
</style>
