<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import AllocationSlider from './AllocationSlider.svelte';
	import WealthChart from './WealthChart.svelte';
	import {
		calculateGrowth,
		yearsToFinancialFreedom,
		getStrategyLabel,
		formatCurrency,
		type Allocation
	} from '$lib/finance';
	import { TrendingUp, Wallet, PieChart } from 'lucide-svelte';

	let {
		monthlyIncome = $bindable(5000),
		startingSavings = $bindable(10000),
		allocation = $bindable({
			stocks: 40,
			crypto: 15,
			realEstate: 30,
			cash: 15
		} as Allocation)
	} = $props();

	let monthlyContribution = $derived(monthlyIncome * 0.3);

	let totalAllocation = $derived(
		allocation.stocks + allocation.crypto + allocation.realEstate + allocation.cash
	);

	let growthData = $derived(calculateGrowth(startingSavings, monthlyContribution, allocation, 40));
	let yearsToFreedom = $derived(
		yearsToFinancialFreedom(startingSavings, monthlyIncome, monthlyContribution, allocation)
	);
	let strategy = $derived(getStrategyLabel(allocation));
	let finalWealth = $derived(growthData[growthData.length - 1]?.value ?? 0);

	// Donut chart data
	let donutSegments = $derived.by(() => {
		const total = totalAllocation || 1;
		const items = [
			{ key: 'stocks', label: 'Stocks', pct: allocation.stocks, color: '#00E38C' },
			{ key: 'crypto', label: 'Crypto', pct: allocation.crypto, color: '#3A86FF' },
			{ key: 'realEstate', label: 'Real Estate', pct: allocation.realEstate, color: '#FF7A00' },
			{ key: 'cash', label: 'Cash', pct: allocation.cash, color: '#A0A0B2' }
		];
		let offset = 0;
		return items.map(item => {
			const fraction = item.pct / total;
			const seg = { ...item, fraction, offset };
			offset += fraction;
			return seg;
		});
	});

	let sectionEl: HTMLElement;
	let cardEls: HTMLElement[] = [];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						animate(entry.target as HTMLElement, { opacity: [0, 1], y: [30, 0] }, { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] });
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		cardEls.forEach((el) => {
			if (el) {
				el.style.opacity = '0';
				observer.observe(el);
			}
		});

		return () => observer.disconnect();
	});

	function formatInput(val: number): string {
		return new Intl.NumberFormat('en-US').format(val);
	}

	function handleIncomeInput(e: Event) {
		const raw = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
		monthlyIncome = Math.max(0, parseInt(raw) || 0);
	}

	function handleSavingsInput(e: Event) {
		const raw = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, '');
		startingSavings = Math.max(0, parseInt(raw) || 0);
	}

	function donutArc(startFraction: number, endFraction: number, r: number): string {
		const startAngle = startFraction * 2 * Math.PI - Math.PI / 2;
		const endAngle = endFraction * 2 * Math.PI - Math.PI / 2;
		const cx = 60, cy = 60;
		const x1 = cx + r * Math.cos(startAngle);
		const y1 = cy + r * Math.sin(startAngle);
		const x2 = cx + r * Math.cos(endAngle);
		const y2 = cy + r * Math.sin(endAngle);
		const large = endFraction - startFraction > 0.5 ? 1 : 0;
		return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
	}
</script>

<section id="interactive" bind:this={sectionEl} class="interactive-section">
	<div class="section-bg">
		<div class="bg-grid"></div>
	</div>

	<div class="section-container">
		<div class="section-header">
			<div class="section-label">
				<TrendingUp size={14} strokeWidth={2} />
				<span>Investment Simulator</span>
			</div>
			<h2 class="section-title">Shape Your Investment Strategy</h2>
			<p class="section-subtitle">Adjust the inputs below and watch your future unfold in real time.</p>
		</div>

		<div class="grid-layout">
			<!-- Left: Inputs -->
			<div class="inputs-column">
				<!-- Income & Savings Card -->
				<div class="glass-card" bind:this={cardEls[0]}>
					<div class="card-title-row">
						<Wallet size={16} strokeWidth={1.5} />
						<h3 class="card-title">Your Finances</h3>
					</div>

					<div class="input-group">
						<label class="input-label" for="income">Monthly Income</label>
						<div class="input-wrapper">
							<span class="input-prefix">$</span>
							<input
								id="income"
								type="text"
								value={formatInput(monthlyIncome)}
								oninput={handleIncomeInput}
								class="input-field"
								inputmode="numeric"
							/>
						</div>
					</div>

					<div class="input-group">
						<label class="input-label" for="savings">Starting Savings</label>
						<div class="input-wrapper">
							<span class="input-prefix">$</span>
							<input
								id="savings"
								type="text"
								value={formatInput(startingSavings)}
								oninput={handleSavingsInput}
								class="input-field"
								inputmode="numeric"
							/>
						</div>
					</div>

					<div class="contribution-info">
						<span class="info-label">Monthly Investment (30%)</span>
						<span class="info-value font-tabular">{formatCurrency(monthlyContribution)}</span>
					</div>
				</div>

				<!-- Allocation Card -->
				<div class="glass-card" bind:this={cardEls[1]}>
					<div class="card-header-row">
						<div class="card-title-row">
							<PieChart size={16} strokeWidth={1.5} />
							<h3 class="card-title">Allocation</h3>
						</div>
						<span class="total-badge font-tabular" class:over={totalAllocation > 100} class:under={totalAllocation < 100}>
							{totalAllocation}%
						</span>
					</div>

					{#if totalAllocation !== 100}
						<p class="allocation-warning">
							{totalAllocation > 100 ? 'Over-allocated! Reduce some categories.' : 'Under-allocated. Add more to maximize returns.'}
						</p>
					{/if}

					<!-- Donut Chart -->
					<div class="donut-row">
						<svg viewBox="0 0 120 120" class="donut-svg">
							{#each donutSegments as seg}
								{#if seg.fraction > 0.001}
									<path
										d={donutArc(seg.offset, seg.offset + seg.fraction, 44)}
										fill="none"
										stroke={seg.color}
										stroke-width="10"
										stroke-linecap="round"
										style="transition: d 0.4s ease;"
									/>
								{/if}
							{/each}
							<text x="60" y="56" text-anchor="middle" fill="#EAEAF0" font-size="16" font-weight="800" font-family="Inter">{totalAllocation}%</text>
							<text x="60" y="72" text-anchor="middle" fill="#7A7F8E" font-size="8" font-weight="500" font-family="Inter">ALLOCATED</text>
						</svg>
						<div class="donut-legend">
							{#each donutSegments as seg}
								<div class="legend-item">
									<div class="legend-dot" style="background: {seg.color};"></div>
									<span class="legend-label">{seg.label}</span>
									<span class="legend-pct font-tabular">{seg.pct}%</span>
								</div>
							{/each}
						</div>
					</div>

					<div class="sliders-stack">
						<AllocationSlider label="Stocks" bind:value={allocation.stocks} color="#00E38C" />
						<AllocationSlider label="Crypto" bind:value={allocation.crypto} color="#3A86FF" />
						<AllocationSlider label="Real Estate" bind:value={allocation.realEstate} color="#FF7A00" />
						<AllocationSlider label="Cash" bind:value={allocation.cash} color="#A0A0B2" />
					</div>
				</div>
			</div>

			<!-- Right: Results -->
			<div class="results-column">
				<div class="glass-card result-card" bind:this={cardEls[2]}>
					<WealthChart data={growthData} />

					<div class="result-stats">
						<div class="big-stat">
							<span class="stat-label">Financial Freedom in</span>
							<span class="stat-value font-tabular">
								{#if yearsToFreedom >= 99}
									<span class="stat-number warning">99+ years</span>
								{:else}
									<span class="stat-number">{yearsToFreedom}</span>
									<span class="stat-unit">years</span>
								{/if}
							</span>
						</div>

						<div class="stat-row">
							<div class="mini-stat">
								<span class="mini-label">Projected at 40 years</span>
								<span class="mini-value font-tabular">{formatCurrency(finalWealth)}</span>
							</div>
							<div class="mini-stat">
								<span class="mini-label">Strategy</span>
								<span class="mini-value strategy" class:aggressive={strategy.type === 'aggressive'} class:conservative={strategy.type === 'conservative'} class:balanced={strategy.type === 'balanced'}>
									{strategy.label}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.interactive-section {
		width: 100%;
		padding: 6rem 1.5rem;
		position: relative;
		overflow: hidden;
	}

	.section-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}

	.bg-grid {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(58, 134, 255, 0.03) 1px, transparent 1px);
		background-size: 60px 60px;
		mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 10%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 10%, transparent 70%);
	}

	.section-container {
		max-width: 1200px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	.section-header {
		text-align: center;
		margin-bottom: 3.5rem;
	}

	.section-label {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.72rem;
		font-weight: 600;
		color: #3A86FF;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 0.75rem;
	}

	.section-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 800;
		color: #EAEAF0;
		letter-spacing: -0.02em;
		margin-bottom: 0.75rem;
	}

	.section-subtitle {
		font-size: 1.05rem;
		color: #A0A0B2;
		font-weight: 400;
	}

	.grid-layout {
		display: grid;
		grid-template-columns: 400px 1fr;
		gap: 2rem;
		align-items: start;
	}

	@media (max-width: 900px) {
		.grid-layout {
			grid-template-columns: 1fr;
		}
	}

	.inputs-column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.results-column {
		display: flex;
		flex-direction: column;
	}

	.glass-card {
		background: rgba(18, 18, 26, 0.5);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 20px;
		padding: 1.75rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03);
		position: relative;
		overflow: hidden;
	}

	.glass-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(58, 134, 255, 0.12), transparent);
	}

	.result-card {
		padding: 1.75rem 1.75rem 2rem;
	}

	.card-title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: #3A86FF;
		margin-bottom: 1.25rem;
	}

	.card-title {
		font-size: 0.85rem;
		font-weight: 600;
		color: #A0A0B2;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 0;
	}

	.card-header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.total-badge {
		font-size: 0.8rem;
		font-weight: 700;
		padding: 0.25rem 0.65rem;
		border-radius: 6px;
		background: rgba(58, 134, 255, 0.1);
		color: #3A86FF;
		border: 1px solid rgba(58, 134, 255, 0.15);
	}

	.total-badge.over {
		background: rgba(255, 77, 77, 0.1);
		color: #FF4D4D;
		border-color: rgba(255, 77, 77, 0.15);
	}

	.total-badge.under {
		background: rgba(255, 122, 0, 0.1);
		color: #FF7A00;
		border-color: rgba(255, 122, 0, 0.15);
	}

	.allocation-warning {
		font-size: 0.8rem;
		color: #FF7A00;
		margin-bottom: 0.75rem;
		padding: 0.5rem 0.75rem;
		background: rgba(255, 122, 0, 0.06);
		border-radius: 8px;
		border: 1px solid rgba(255, 122, 0, 0.1);
	}

	/* Donut Chart */
	.donut-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1.25rem;
		padding: 0.75rem;
		background: rgba(11, 11, 15, 0.4);
		border-radius: 14px;
		border: 1px solid rgba(255, 255, 255, 0.03);
	}

	.donut-svg {
		width: 100px;
		height: 100px;
		flex-shrink: 0;
	}

	.donut-legend {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		flex: 1;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.72rem;
	}

	.legend-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.legend-label {
		color: #A0A0B2;
		flex: 1;
	}

	.legend-pct {
		color: #EAEAF0;
		font-weight: 600;
	}

	.sliders-stack {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.input-group {
		margin-bottom: 1rem;
	}

	.input-label {
		display: block;
		font-size: 0.8rem;
		font-weight: 500;
		color: #A0A0B2;
		margin-bottom: 0.4rem;
	}

	.input-wrapper {
		display: flex;
		align-items: center;
		background: rgba(11, 11, 15, 0.6);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		padding: 0 0.875rem;
		transition: border-color 0.2s ease, box-shadow 0.2s ease;
	}

	.input-wrapper:focus-within {
		border-color: rgba(58, 134, 255, 0.4);
		box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.08);
	}

	.input-prefix {
		font-size: 0.95rem;
		font-weight: 600;
		color: #555B68;
		margin-right: 0.25rem;
	}

	.input-field {
		flex: 1;
		background: none;
		border: none;
		outline: none;
		color: #EAEAF0;
		font-size: 1.05rem;
		font-weight: 600;
		font-family: 'Inter', system-ui, sans-serif;
		padding: 0.75rem 0;
		font-variant-numeric: tabular-nums;
	}

	.contribution-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.75rem;
		background: rgba(58, 134, 255, 0.04);
		border-radius: 10px;
		border: 1px solid rgba(58, 134, 255, 0.08);
	}

	.info-label {
		font-size: 0.8rem;
		color: #A0A0B2;
	}

	.info-value {
		font-size: 0.95rem;
		font-weight: 700;
		color: #3A86FF;
	}

	.result-stats {
		margin-top: 1.5rem;
	}

	.big-stat {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.stat-label {
		display: block;
		font-size: 0.85rem;
		color: #A0A0B2;
		font-weight: 500;
		margin-bottom: 0.5rem;
	}

	.stat-value {
		display: flex;
		align-items: baseline;
		justify-content: center;
		gap: 0.5rem;
	}

	.stat-number {
		font-size: clamp(2.5rem, 5vw, 3.5rem);
		font-weight: 900;
		color: #3A86FF;
		line-height: 1;
	}

	.stat-number.warning {
		color: #FF4D4D;
	}

	.stat-unit {
		font-size: 1.2rem;
		font-weight: 600;
		color: #A0A0B2;
	}

	.stat-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.mini-stat {
		text-align: center;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 12px;
		border: 1px solid rgba(255, 255, 255, 0.03);
	}

	.mini-label {
		display: block;
		font-size: 0.75rem;
		color: #555B68;
		margin-bottom: 0.4rem;
	}

	.mini-value {
		font-size: 1rem;
		font-weight: 700;
		color: #EAEAF0;
	}

	.mini-value.aggressive { color: #FF7A00; }
	.mini-value.conservative { color: #A0A0B2; }
	.mini-value.balanced { color: #3A86FF; }
</style>
