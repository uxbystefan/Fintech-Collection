<script lang="ts">
	import FinanceInputForm from '$lib/components/FinanceInputForm.svelte';
	import FinancialScore from '$lib/components/FinancialScore.svelte';
	import NetWorthCard from '$lib/components/NetWorthCard.svelte';
	import AIInsights from '$lib/components/AIInsights.svelte';
	import ProjectionChart from '$lib/components/ProjectionChart.svelte';
	import { metrics, projection, insights } from '$lib/store';
	import { formatCurrency, formatPercent } from '$lib/finance';

	let m = $derived($metrics);
	let p = $derived($projection);
	let ins = $derived($insights);
</script>

<svelte:head>
	<title>Simulation · AI Wealth Management</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<div>
			<h1 class="page-title">Financial Simulation</h1>
			<p class="page-subtitle">
				Model your financial situation and see AI-driven insights update in real time.
			</p>
		</div>
		<a href="/dashboard" class="back-btn">← Dashboard</a>
	</div>

	<div class="sim-grid">
		<!-- Left: Form -->
		<div class="form-col">
			<FinanceInputForm />
		</div>

		<!-- Right: Live results -->
		<div class="results-col">
			<!-- Summary header card -->
			<div class="summary-card card">
				<span class="label">Live Snapshot</span>
				<div class="snapshot-grid">
					<div class="snap-item">
						<span class="snap-label">Net Worth</span>
						<span
							class="snap-value metric-value"
							style="color: {m.netWorth >= 0 ? 'var(--color-accent)' : 'var(--color-negative)'}"
						>
							{formatCurrency(m.netWorth)}
						</span>
					</div>
					<div class="snap-item">
						<span class="snap-label">Health Score</span>
						<span
							class="snap-value metric-value"
							style="color: {m.healthScore >= 75 ? 'var(--color-accent)' : m.healthScore >= 50 ? 'var(--color-primary)' : 'var(--color-negative)'}"
						>
							{m.healthScore} / 100
						</span>
					</div>
					<div class="snap-item">
						<span class="snap-label">Savings Rate</span>
						<span class="snap-value metric-value">{formatPercent(m.savingsRate)}</span>
					</div>
					<div class="snap-item">
						<span class="snap-label">Debt Ratio</span>
						<span
							class="snap-value metric-value"
							style="color: {m.debtRatio > 0.4 ? 'var(--color-negative)' : 'var(--color-text-primary)'}"
						>
							{formatPercent(m.debtRatio)}
						</span>
					</div>
				</div>
			</div>

			<FinancialScore score={m.healthScore} breakdown={m.healthScoreBreakdown} />
			<AIInsights insights={ins} />
			<NetWorthCard
				netWorth={m.netWorth}
				totalAssets={m.totalAssets}
				totalLiabilities={m.totalLiabilities}
				debtRatio={m.debtRatio}
			/>
			<ProjectionChart projection={p} />
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.page-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.page-title {
		font-size: 1.75rem;
	}

	.page-subtitle {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin-top: var(--space-1);
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		height: 38px;
		padding: 0 var(--space-5);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-sans);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: background var(--transition), border-color var(--transition);
		white-space: nowrap;
	}

	.back-btn:hover {
		background: var(--color-bg);
		border-color: var(--color-border-hover);
	}

	/* ===== SIM GRID ===== */
	.sim-grid {
		display: grid;
		grid-template-columns: 420px 1fr;
		gap: var(--space-8);
		align-items: start;
	}

	.form-col {
		position: sticky;
		top: 80px;
	}

	.results-col {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	/* ===== SUMMARY CARD ===== */
	.summary-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.snapshot-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-4);
	}

	.snap-item {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding: var(--space-4);
		background: var(--color-bg);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.snap-label {
		font-family: var(--font-sans);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.snap-value {
		font-size: 1.25rem;
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 1100px) {
		.sim-grid {
			grid-template-columns: 1fr;
		}

		.form-col {
			position: static;
		}
	}
</style>
