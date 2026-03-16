<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { WealthAllocation } from '$lib/types';
	import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';

	Chart.register(PieController, ArcElement, Tooltip, Legend);

	let { allocation }: { allocation: WealthAllocation } = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	const COLORS = {
		cash: '#1E3A8A',
		stocks: '#0F766E',
		crypto: '#7C3AED',
		realEstate: '#B45309',
		other: '#9CA3AF'
	};

	const LABELS = ['Cash & Savings', 'Stocks & Investments', 'Crypto', 'Real Estate'];

	function getChartData(a: WealthAllocation) {
		return [a.cash, a.stocks, a.crypto, a.realEstate].map((v) => parseFloat(v.toFixed(2)));
	}

	function createChart() {
		if (!canvas) return;
		const data = getChartData(allocation);
		const hasData = data.some((v) => v > 0);

		chart = new Chart(canvas, {
			type: 'pie',
			data: {
				labels: LABELS,
				datasets: [
					{
						data: hasData ? data : [25, 25, 25, 25],
						backgroundColor: [COLORS.cash, COLORS.stocks, COLORS.crypto, COLORS.realEstate],
						borderColor: '#FFFFFF',
						borderWidth: 3,
						hoverBorderWidth: 3
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						callbacks: {
							label: (ctx) => {
								const val = hasData ? ctx.parsed : 25;
								return `  ${ctx.label}: ${val.toFixed(1)}%`;
							}
						},
						backgroundColor: '#FFFFFF',
						borderColor: '#E5E7EB',
						borderWidth: 1,
						titleColor: '#111827',
						bodyColor: '#4B5563',
						padding: 10,
						titleFont: { family: 'IBM Plex Sans', size: 12, weight: '600' },
						bodyFont: { family: 'IBM Plex Sans', size: 12 }
					}
				}
			}
		});
	}

	$effect(() => {
		if (chart && allocation) {
			const data = getChartData(allocation);
			const hasData = data.some((v) => v > 0);
			chart.data.datasets[0].data = hasData ? data : [25, 25, 25, 25];
			chart.update('active');
		}
	});

	onMount(() => {
		createChart();
	});

	onDestroy(() => {
		chart?.destroy();
	});

	const legendItems = [
		{ label: 'Cash & Savings', color: COLORS.cash, key: 'cash' as keyof WealthAllocation },
		{ label: 'Stocks & Investments', color: COLORS.stocks, key: 'stocks' as keyof WealthAllocation },
		{ label: 'Crypto', color: COLORS.crypto, key: 'crypto' as keyof WealthAllocation },
		{ label: 'Real Estate', color: COLORS.realEstate, key: 'realEstate' as keyof WealthAllocation }
	];
</script>

<div class="card">
	<span class="label">Wealth Allocation</span>

	<div class="chart-wrap">
		<canvas bind:this={canvas} aria-label="Wealth allocation pie chart"></canvas>
	</div>

	<div class="legend">
		{#each legendItems as item}
			<div class="legend-row">
				<span class="legend-dot" style="background: {item.color}"></span>
				<span class="legend-label">{item.label}</span>
				<span class="legend-value metric-value">{allocation[item.key].toFixed(1)}%</span>
			</div>
		{/each}
	</div>
</div>

<style>
	.chart-wrap {
		width: 180px;
		height: 180px;
		margin: var(--space-5) auto;
	}

	.legend {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		margin-top: var(--space-2);
	}

	.legend-row {
		display: flex;
		align-items: center;
		gap: var(--space-3);
	}

	.legend-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.legend-label {
		flex: 1;
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		color: var(--color-text-secondary);
	}

	.legend-value {
		font-size: 0.875rem;
		color: var(--color-text-primary);
	}
</style>
