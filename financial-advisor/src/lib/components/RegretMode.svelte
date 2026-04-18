<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import WealthChart from './WealthChart.svelte';
	import {
		calculateGrowth,
		yearsToFinancialFreedom,
		formatCurrency,
		type Allocation
	} from '$lib/finance';
	import { AlertTriangle, Clock, TrendingDown } from 'lucide-svelte';

	let {
		monthlyIncome = 5000,
		startingSavings = 10000,
		allocation = { stocks: 40, crypto: 15, realEstate: 30, cash: 15 }
	}: {
		monthlyIncome?: number;
		startingSavings?: number;
		allocation?: Allocation;
	} = $props();

	let regretMode = $state(false);
	let monthlyContribution = $derived(monthlyIncome * 0.3);
	let delayYears = 5;

	let normalGrowth = $derived(calculateGrowth(startingSavings, monthlyContribution, allocation, 40));
	let normalYears = $derived(yearsToFinancialFreedom(startingSavings, monthlyIncome, monthlyContribution, allocation));

	let delayedGrowth = $derived(calculateGrowth(startingSavings, monthlyContribution, allocation, 40 - delayYears));
	let delayedYears = $derived(yearsToFinancialFreedom(startingSavings, monthlyIncome, monthlyContribution, allocation) + delayYears);

	let paddedDelayedGrowth = $derived.by(() => {
		const padded = Array.from({ length: delayYears }, (_, i) => ({
			year: i,
			value: startingSavings
		}));
		return [
			...padded,
			...delayedGrowth.map(p => ({ year: p.year + delayYears, value: p.value }))
		];
	});

	let yearDifference = $derived(
		delayedYears >= 99 ? '99+' : Math.round((delayedYears - normalYears) * 10) / 10
	);

	let finalNormal = $derived(normalGrowth[normalGrowth.length - 1]?.value ?? 0);
	let finalDelayed = $derived(paddedDelayedGrowth[paddedDelayedGrowth.length - 1]?.value ?? 0);
	let lostWealth = $derived(Math.max(0, finalNormal - finalDelayed));

	let sectionEl: HTMLElement;
	let hasAnimated = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						hasAnimated = true;
						animate(
							sectionEl,
							{ opacity: [0, 1], y: [30, 0] },
							{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
						);
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.1 }
		);
		if (sectionEl) observer.observe(sectionEl);
		return () => observer.disconnect();
	});

	function toggleRegret() {
		regretMode = !regretMode;
	}
</script>

<section id="regret" class="regret-section" bind:this={sectionEl} style="opacity: 0;">
	<!-- Dramatic background when regret is on -->
	{#if regretMode}
		<div class="regret-bg-warning"></div>
	{/if}

	<div class="regret-container">
		<div class="regret-header">
			<div class="header-row">
				<div>
					<div class="section-label" class:warning={regretMode}>
						<AlertTriangle size={14} strokeWidth={2} />
						<span>What-If Analysis</span>
					</div>
					<h2 class="regret-title">Regret Mode</h2>
					<p class="regret-subtitle">What if you start {delayYears} years later?</p>
				</div>

				<button
					class="toggle-switch"
					class:active={regretMode}
					onclick={toggleRegret}
					role="switch"
					aria-checked={regretMode}
					aria-label="Toggle regret mode"
				>
					<div class="toggle-track">
						<div class="toggle-thumb"></div>
					</div>
					<span class="toggle-label">{regretMode ? 'ON' : 'OFF'}</span>
				</button>
			</div>
		</div>

		<div class="regret-chart-card glass-card" class:warning-glow={regretMode}>
			<WealthChart
				data={normalGrowth}
				regretData={regretMode ? paddedDelayedGrowth : null}
				showRegret={regretMode}
			/>

			{#if regretMode}
				<div class="regret-stats">
					<div class="regret-stat">
						<div class="regret-stat-icon">
							<Clock size={18} strokeWidth={1.5} />
						</div>
						<span class="regret-stat-label">Extra years needed</span>
						<span class="regret-stat-value font-tabular">+{yearDifference} yrs</span>
					</div>
					<div class="regret-stat">
						<div class="regret-stat-icon">
							<TrendingDown size={18} strokeWidth={1.5} />
						</div>
						<span class="regret-stat-label">Wealth lost</span>
						<span class="regret-stat-value font-tabular">-{formatCurrency(lostWealth)}</span>
					</div>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.regret-section {
		width: 100%;
		padding: 6rem 1.5rem;
		position: relative;
		overflow: hidden;
		transition: background 0.6s ease;
	}

	.regret-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 60%;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(58, 134, 255, 0.12), transparent);
	}

	.regret-bg-warning {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255, 77, 77, 0.03) 0%, transparent 70%);
		animation: pulse-warning 3s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes pulse-warning {
		0%, 100% { opacity: 0.5; }
		50% { opacity: 1; }
	}

	.regret-container {
		max-width: 900px;
		margin: 0 auto;
		position: relative;
		z-index: 1;
	}

	.regret-header {
		margin-bottom: 2rem;
	}

	.header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
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
		transition: color 0.3s ease;
	}

	.section-label.warning {
		color: #FF4D4D;
	}

	.regret-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 800;
		color: #EAEAF0;
		letter-spacing: -0.02em;
		margin-bottom: 0.5rem;
	}

	.regret-subtitle {
		font-size: 1.05rem;
		color: #A0A0B2;
	}

	.toggle-switch {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		font-family: 'Inter', system-ui, sans-serif;
	}

	.toggle-track {
		width: 52px;
		height: 28px;
		background: #1A1A26;
		border-radius: 14px;
		position: relative;
		transition: background 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.06);
	}

	.active .toggle-track {
		background: rgba(255, 77, 77, 0.15);
		border-color: rgba(255, 77, 77, 0.3);
	}

	.toggle-thumb {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #555B68;
		transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
	}

	.active .toggle-thumb {
		transform: translateX(24px);
		background: #FF4D4D;
		box-shadow: 0 0 12px rgba(255, 77, 77, 0.4);
	}

	.toggle-label {
		font-size: 0.8rem;
		font-weight: 700;
		color: #555B68;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		transition: color 0.3s ease;
	}

	.active .toggle-label {
		color: #FF4D4D;
	}

	.glass-card {
		background: rgba(18, 18, 26, 0.5);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 20px;
		padding: 1.75rem;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03);
		transition: border-color 0.5s ease, box-shadow 0.5s ease;
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
		background: linear-gradient(90deg, transparent, rgba(58, 134, 255, 0.1), transparent);
		transition: background 0.5s ease;
	}

	.glass-card.warning-glow::before {
		background: linear-gradient(90deg, transparent, rgba(255, 77, 77, 0.2), transparent);
	}

	.glass-card.warning-glow {
		border-color: rgba(255, 77, 77, 0.12);
		box-shadow: 0 0 60px rgba(255, 77, 77, 0.04), 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.regret-stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.regret-stat {
		text-align: center;
		padding: 1.25rem 1rem;
		background: rgba(255, 77, 77, 0.03);
		border-radius: 14px;
		border: 1px solid rgba(255, 77, 77, 0.08);
	}

	.regret-stat-icon {
		color: #FF4D4D;
		margin-bottom: 0.5rem;
		display: flex;
		justify-content: center;
	}

	.regret-stat-label {
		display: block;
		font-size: 0.72rem;
		color: #A0A0B2;
		margin-bottom: 0.4rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.regret-stat-value {
		font-size: 1.3rem;
		font-weight: 800;
		color: #FF4D4D;
	}
</style>
