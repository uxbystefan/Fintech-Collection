<script lang="ts">
	import FinancialScore from '$lib/components/FinancialScore.svelte';
	import NetWorthCard from '$lib/components/NetWorthCard.svelte';
	import WealthAllocationChart from '$lib/components/WealthAllocationChart.svelte';
	import AIInsights from '$lib/components/AIInsights.svelte';
	import ProjectionChart from '$lib/components/ProjectionChart.svelte';
	import { metrics, allocation, projection, insights } from '$lib/store';
	import { formatCurrency, formatPercent } from '$lib/finance';

	let m = $derived($metrics);
	let a = $derived($allocation);
	let p = $derived($projection);
	let ins = $derived($insights);
</script>

<svelte:head>
	<title>Dashboard · AI Wealth Management</title>
</svelte:head>

<div class="page">
	<!-- Page header -->
	<div class="page-header">
		<div>
			<h1 class="page-title">Financial Dashboard</h1>
			<p class="page-subtitle">Real-time analysis of your financial position</p>
		</div>
		<a href="/simulation" class="cta-btn">Edit Profile →</a>
	</div>

	<!-- KPI Strip -->
	<div class="kpi-strip">
		<div class="kpi">
			<span class="kpi-label">Net Worth</span>
			<span
				class="kpi-value metric-value"
				style="color: {m.netWorth >= 0 ? 'var(--color-accent)' : 'var(--color-negative)'}"
			>
				{formatCurrency(m.netWorth)}
			</span>
		</div>
		<div class="kpi-divider"></div>
		<div class="kpi">
			<span class="kpi-label">Savings Rate</span>
			<span
				class="kpi-value metric-value"
				style="color: {m.savingsRate >= 0.2 ? 'var(--color-accent)' : m.savingsRate >= 0.1 ? 'var(--color-warning)' : 'var(--color-negative)'}"
			>
				{formatPercent(m.savingsRate)}
			</span>
		</div>
		<div class="kpi-divider"></div>
		<div class="kpi">
			<span class="kpi-label">Emergency Fund</span>
			<span
				class="kpi-value metric-value"
				style="color: {m.emergencyFundMonths >= 6 ? 'var(--color-accent)' : m.emergencyFundMonths >= 3 ? 'var(--color-warning)' : 'var(--color-negative)'}"
			>
				{m.emergencyFundMonths.toFixed(1)} mo
			</span>
		</div>
		<div class="kpi-divider"></div>
		<div class="kpi">
			<span class="kpi-label">Investment Allocation</span>
			<span class="kpi-value metric-value" style="color: var(--color-primary)">
				{formatPercent(m.investmentAllocation)}
			</span>
		</div>
	</div>

	<!-- Main grid -->
	<div class="dashboard-grid">
		<!-- Col 1: Score + Net Worth -->
		<div class="col col--left">
			<FinancialScore score={m.healthScore} breakdown={m.healthScoreBreakdown} />
			<NetWorthCard
				netWorth={m.netWorth}
				totalAssets={m.totalAssets}
				totalLiabilities={m.totalLiabilities}
				debtRatio={m.debtRatio}
			/>
		</div>

		<!-- Col 2: Allocation + Insights -->
		<div class="col col--mid">
			<WealthAllocationChart allocation={a} />
			<AIInsights insights={ins} />
		</div>

		<!-- Col 3: Projection -->
		<div class="col col--right">
			<ProjectionChart projection={p} />
		</div>
	</div>

	<!-- Disclaimer -->
	<p class="disclaimer">
		This dashboard is a simulation tool for educational purposes only. Values are based on
		simplified financial models and do not constitute financial advice.
	</p>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	/* ===== PAGE HEADER ===== */
	.page-header {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.page-title {
		font-size: 1.75rem;
		color: var(--color-text-primary);
	}

	.page-subtitle {
		font-size: 0.875rem;
		color: var(--color-text-muted);
		margin-top: var(--space-1);
	}

	.cta-btn {
		display: inline-flex;
		align-items: center;
		height: 38px;
		padding: 0 var(--space-5);
		background: var(--color-primary);
		color: #FFFFFF;
		border-radius: var(--radius-md);
		font-family: var(--font-sans);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition: background var(--transition);
		white-space: nowrap;
	}

	.cta-btn:hover {
		background: var(--color-primary-light);
	}

	/* ===== KPI STRIP ===== */
	.kpi-strip {
		display: flex;
		align-items: center;
		gap: 0;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		overflow: hidden;
		flex-wrap: wrap;
	}

	.kpi {
		flex: 1;
		min-width: 160px;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding: var(--space-5) var(--space-6);
	}

	.kpi-label {
		font-family: var(--font-sans);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.kpi-value {
		font-size: 1.375rem;
	}

	.kpi-divider {
		width: 1px;
		background: var(--color-border);
		align-self: stretch;
	}

	/* ===== DASHBOARD GRID ===== */
	.dashboard-grid {
		display: grid;
		grid-template-columns: 380px 320px 1fr;
		gap: var(--space-6);
		align-items: start;
	}

	.col {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	/* ===== DISCLAIMER ===== */
	.disclaimer {
		font-size: 0.75rem;
		color: var(--color-text-muted);
		text-align: center;
		padding: var(--space-4) 0;
		border-top: 1px solid var(--color-border);
	}

	/* ===== RESPONSIVE ===== */
	@media (max-width: 1200px) {
		.dashboard-grid {
			grid-template-columns: 1fr 1fr;
		}

		.col--right {
			grid-column: span 2;
		}
	}

	@media (max-width: 768px) {
		.dashboard-grid {
			grid-template-columns: 1fr;
		}

		.col--right {
			grid-column: span 1;
		}

		.kpi-strip {
			flex-direction: column;
			align-items: stretch;
		}

		.kpi-divider {
			width: 100%;
			height: 1px;
			align-self: auto;
		}
	}
</style>
