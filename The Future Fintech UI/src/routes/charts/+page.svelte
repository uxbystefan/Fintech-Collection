<script lang="ts">
	import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
	import FloatingPanel from '$lib/components/FloatingPanel.svelte';
	import PortfolioAreaChart from '$lib/components/charts/PortfolioAreaChart.svelte';
	import BarChart from '$lib/components/charts/BarChart.svelte';
	import LineChart from '$lib/components/charts/LineChart.svelte';
	import DonutChart from '$lib/components/charts/DonutChart.svelte';
	import Sparkline from '$lib/components/charts/Sparkline.svelte';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 100);
	});

	// Sparkline data for quick stats
	const sparklines = [
		{ label: 'Revenue', value: 124500, change: 8.2, color: '#00FFA3' },
		{ label: 'Users', value: 12847, change: 12.4, color: '#00D98C' },
		{ label: 'Volume', value: 2450000, change: -2.1, color: '#9AA6B2' }
	];
</script>

<svelte:head>
	<title>Analytics - Future Fintech</title>
</svelte:head>

<div class="charts-container">
	<AnimatedBackground />

	<div class="charts-content">
		<!-- Header -->
		<div class="page-header" class:visible={mounted}>
			<div>
				<h1 class="page-title">Analytics Dashboard</h1>
				<p class="page-subtitle">Real-time financial insights and performance metrics</p>
			</div>
			<a href="/" class="back-link">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
				Back to Home
			</a>
		</div>

		<!-- Quick Stats with Sparklines -->
		<div class="quick-stats">
			{#each sparklines as stat, i}
				<div class="stat-card" style="animation-delay: {i * 0.1}s">
					<div class="stat-header">
						<div>
							<div class="stat-label">{stat.label}</div>
							<div class="stat-value">
								{stat.label === 'Revenue' || stat.label === 'Volume' ? '$' : ''}{stat.value.toLocaleString()}
							</div>
						</div>
						<div
							class="stat-change"
							class:positive={stat.change > 0}
							class:negative={stat.change < 0}
						>
							{stat.change > 0 ? '+' : ''}{stat.change}%
						</div>
					</div>
					<Sparkline color={stat.color} />
				</div>
			{/each}
		</div>

		<!-- Main Charts Grid -->
		<div class="charts-grid">
			<!-- Large Portfolio Chart -->
			<div class="chart-section full-width">
				<FloatingPanel title="Portfolio Performance" delay={200}>
					<PortfolioAreaChart />
				</FloatingPanel>
			</div>

			<!-- Revenue by Category -->
			<div class="chart-section">
				<FloatingPanel title="Revenue by Category" delay={300}>
					<BarChart />
				</FloatingPanel>
			</div>

			<!-- Asset Allocation -->
			<div class="chart-section">
				<FloatingPanel title="Asset Allocation" delay={400}>
					<DonutChart />
				</FloatingPanel>
			</div>

			<!-- Market Trends -->
			<div class="chart-section full-width">
				<FloatingPanel title="Crypto Market Trends" delay={500}>
					<LineChart />
				</FloatingPanel>
			</div>
		</div>
	</div>
</div>

<style>
	.charts-container {
		position: relative;
		min-height: 100vh;
		width: 100%;
		background: #0b0f14;
		overflow-x: hidden;
	}

	.charts-content {
		position: relative;
		z-index: 10;
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		padding: 60px 40px 80px;
	}

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 40px;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 400ms ease-out,
			transform 400ms ease-out;
	}

	.page-header.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.page-title {
		font-size: 40px;
		font-weight: 700;
		color: #e6edf3;
		margin: 0 0 8px;
	}

	.page-subtitle {
		font-size: 18px;
		color: #9aa6b2;
		margin: 0;
	}

	.back-link {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 12px 24px;
		background: #11161d;
		border: 1px solid #1f2630;
		border-radius: 8px;
		color: #e6edf3;
		text-decoration: none;
		font-size: 14px;
		font-weight: 600;
		transition:
			border-color 150ms ease,
			background-color 150ms ease;
	}

	.back-link:hover {
		border-color: rgba(0, 255, 163, 0.3);
		background: #161c24;
	}

	.back-link:focus {
		outline: 2px solid rgba(0, 255, 163, 0.5);
		outline-offset: 2px;
	}

	.quick-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
		margin-bottom: 40px;
	}

	.stat-card {
		background: #11161d;
		border: 1px solid #1f2630;
		border-radius: 12px;
		padding: 20px;
		opacity: 0;
		animation: slide-in 400ms ease-out forwards;
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.stat-card:hover {
		border-color: rgba(0, 255, 163, 0.25);
		box-shadow: 0 0 20px rgba(0, 255, 163, 0.12);
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.stat-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 16px;
	}

	.stat-label {
		font-size: 13px;
		color: #7f8a96;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		margin-bottom: 8px;
	}

	.stat-value {
		font-size: 24px;
		font-weight: 700;
		color: #e6edf3;
	}

	.stat-change {
		font-size: 14px;
		font-weight: 600;
		padding: 4px 8px;
		border-radius: 4px;
	}

	.stat-change.positive {
		color: #00ffa3;
		background: rgba(0, 255, 163, 0.1);
	}

	.stat-change.negative {
		color: #ff4444;
		background: rgba(255, 68, 68, 0.1);
	}

	.charts-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24px;
	}

	.chart-section.full-width {
		grid-column: 1 / -1;
	}

	@media (max-width: 1200px) {
		.charts-grid {
			grid-template-columns: 1fr;
		}

		.quick-stats {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.charts-content {
			padding: 40px 20px 60px;
		}

		.page-header {
			flex-direction: column;
			gap: 20px;
		}

		.page-title {
			font-size: 32px;
		}

		.page-subtitle {
			font-size: 16px;
		}
	}
</style>
