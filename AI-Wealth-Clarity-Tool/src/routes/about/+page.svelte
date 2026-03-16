<script lang="ts">
	const pillars = [
		{
			icon: '◈',
			title: 'Health Score',
			desc: 'A composite score (0–100) computed from savings rate, debt ratio, emergency fund coverage, and investment allocation.'
		},
		{
			icon: '◐',
			title: 'Net Worth Engine',
			desc: 'Net worth is calculated as total assets minus total liabilities. Assets include cash, savings, stocks, crypto, real estate, and investments.'
		},
		{
			icon: '◑',
			title: 'AI Insights',
			desc: 'Rule-based insight engine that analyses your financial ratios and surfaces actionable signals — no machine learning, just precision logic.'
		},
		{
			icon: '◒',
			title: 'Wealth Projection',
			desc: 'A 20-year projection based on your current net worth, monthly surplus, and an assumed 6% annual return on invested assets.'
		}
	];

	const scoreBreakdown = [
		{ label: 'Savings Rate', weight: '30%', desc: 'Target ≥ 20% of monthly income' },
		{ label: 'Debt Ratio', weight: '30%', desc: 'Target ≤ 20% of total assets' },
		{ label: 'Emergency Fund', weight: '20%', desc: 'Target ≥ 6 months of expenses' },
		{ label: 'Investment Allocation', weight: '20%', desc: 'Target ≥ 40% of total assets' }
	];
</script>

<svelte:head>
	<title>About · AI Wealth Management</title>
</svelte:head>

<div class="page">
	<div class="page-header">
		<h1 class="page-title">About This Tool</h1>
		<p class="page-subtitle">
			A browser-based financial simulation dashboard — no backend, no data collection.
		</p>
	</div>

	<div class="about-grid">
		<!-- How it works -->
		<div class="card about-card">
			<h2 class="section-title">How It Works</h2>
			<p class="section-text">
				AI Wealth Management is a frontend-only simulation tool. All calculations run entirely in
				your browser using TypeScript. No data is transmitted to any server — your financial inputs
				remain private.
			</p>
			<p class="section-text">
				The dashboard models your financial position using established personal finance principles,
				presenting the results through a professional analytics interface.
			</p>
		</div>

		<!-- Pillars -->
		<div class="card about-card">
			<h2 class="section-title">Core Modules</h2>
			<div class="pillars">
				{#each pillars as p}
					<div class="pillar">
						<span class="pillar-icon" aria-hidden="true">{p.icon}</span>
						<div>
							<h4 class="pillar-title">{p.title}</h4>
							<p class="pillar-desc">{p.desc}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Score methodology -->
		<div class="card about-card score-card">
			<h2 class="section-title">Health Score Methodology</h2>
			<p class="section-text">
				The Financial Health Score is a weighted composite of four independent metrics, returning a
				value between 0 and 100.
			</p>
			<div class="score-table">
				<div class="score-table-header">
					<span>Component</span>
					<span>Weight</span>
					<span>Benchmark</span>
				</div>
				{#each scoreBreakdown as row}
					<div class="score-table-row">
						<span class="row-label">{row.label}</span>
						<span class="row-weight badge badge--neutral">{row.weight}</span>
						<span class="row-desc">{row.desc}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Disclaimer -->
		<div class="card disclaimer-card">
			<div class="disclaimer-inner">
				<span class="disclaimer-icon" aria-hidden="true">⚠</span>
				<div>
					<h4 class="disclaimer-title">Important Disclaimer</h4>
					<p class="disclaimer-text">
						This tool is for educational and illustrative purposes only. The calculations are based on
						simplified financial models and do not account for taxes, inflation variability, market
						risk, or individual circumstances. This is not financial advice. Consult a qualified
						financial professional for personalised guidance.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
		max-width: 960px;
	}

	.page-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.page-title {
		font-size: 1.75rem;
	}

	.page-subtitle {
		font-size: 0.9375rem;
		color: var(--color-text-muted);
	}

	.about-grid {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.about-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.section-title {
		font-size: 1.125rem;
		font-family: var(--font-serif);
	}

	.section-text {
		font-size: 0.9375rem;
		line-height: 1.65;
		color: var(--color-text-secondary);
	}

	/* Pillars */
	.pillars {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.pillar {
		display: flex;
		gap: var(--space-4);
		align-items: flex-start;
	}

	.pillar-icon {
		font-size: 1.25rem;
		color: var(--color-primary);
		flex-shrink: 0;
		width: 28px;
		text-align: center;
		margin-top: 2px;
	}

	.pillar-title {
		font-family: var(--font-sans);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-1);
	}

	.pillar-desc {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		line-height: 1.6;
	}

	/* Score table */
	.score-table {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.score-table-header {
		display: grid;
		grid-template-columns: 1fr 80px 1fr;
		gap: var(--space-4);
		padding: var(--space-3) var(--space-4);
		background: var(--color-bg);
		font-family: var(--font-sans);
		font-size: 0.6875rem;
		font-weight: 600;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--color-text-muted);
	}

	.score-table-row {
		display: grid;
		grid-template-columns: 1fr 80px 1fr;
		gap: var(--space-4);
		padding: var(--space-3) var(--space-4);
		border-top: 1px solid var(--color-border);
		align-items: center;
	}

	.row-label {
		font-family: var(--font-sans);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.row-weight {
		justify-self: start;
	}

	.row-desc {
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
	}

	/* Disclaimer */
	.disclaimer-card {
		border-color: var(--color-warning);
		background: var(--color-warning-muted);
	}

	.disclaimer-inner {
		display: flex;
		gap: var(--space-4);
		align-items: flex-start;
	}

	.disclaimer-icon {
		font-size: 1.25rem;
		color: var(--color-warning);
		flex-shrink: 0;
	}

	.disclaimer-title {
		font-family: var(--font-sans);
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--color-warning);
		margin-bottom: var(--space-2);
	}

	.disclaimer-text {
		font-size: 0.875rem;
		line-height: 1.65;
		color: var(--color-text-secondary);
	}
</style>
