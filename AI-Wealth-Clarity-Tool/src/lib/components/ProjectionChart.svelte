<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import type { ProjectionPoint } from '$lib/types';
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Filler,
		Tooltip
	} from 'chart.js';

	Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip);

	let { projection = [] }: { projection: ProjectionPoint[] } = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	function formatK(value: number): string {
		if (Math.abs(value) >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
		if (Math.abs(value) >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
		return `$${value.toFixed(0)}`;
	}

	function buildChart() {
		if (!canvas || !projection.length) return;
		const labels = projection.map((p) => String(p.year));
		const data = projection.map((p) => p.value);

		chart = new Chart(canvas, {
			type: 'line',
			data: {
				labels,
				datasets: [
					{
						label: 'Projected Net Worth',
						data,
						borderColor: '#1E3A8A',
						backgroundColor: 'rgba(30, 58, 138, 0.07)',
						fill: true,
						tension: 0.4,
						pointRadius: 3,
						pointHoverRadius: 6,
						pointBackgroundColor: '#1E3A8A',
						pointBorderColor: '#FFFFFF',
						pointBorderWidth: 2,
						borderWidth: 2
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: true,
				interaction: { mode: 'index', intersect: false },
				scales: {
					x: {
						grid: { color: '#E5E7EB', lineWidth: 1 },
						border: { dash: [4, 4] },
						ticks: {
							font: { family: 'IBM Plex Sans', size: 11 },
							color: '#9CA3AF',
							maxTicksLimit: 6
						}
					},
					y: {
						grid: { color: '#E5E7EB', lineWidth: 1 },
						border: { dash: [4, 4] },
						ticks: {
							font: { family: 'IBM Plex Sans', size: 11 },
							color: '#9CA3AF',
							callback: (v) => formatK(Number(v))
						}
					}
				},
				plugins: {
					legend: { display: false },
					tooltip: {
						backgroundColor: '#FFFFFF',
						borderColor: '#E5E7EB',
						borderWidth: 1,
						titleColor: '#111827',
						bodyColor: '#4B5563',
						padding: 12,
						titleFont: { family: 'IBM Plex Sans', size: 12, weight: '600' },
						bodyFont: { family: 'IBM Plex Sans', size: 12 },
						callbacks: {
							label: (ctx) => `  Net Worth: ${formatK(Number(ctx.parsed.y))}`
						}
					}
				}
			}
		});
	}

	$effect(() => {
		if (chart && projection.length) {
			chart.data.labels = projection.map((p) => String(p.year));
			chart.data.datasets[0].data = projection.map((p) => p.value);
			chart.update('active');
		}
	});

	onMount(() => {
		buildChart();
	});

	onDestroy(() => {
		chart?.destroy();
	});
</script>

<div class="card projection-card">
	<div class="header">
		<span class="label">Wealth Projection</span>
		<span class="badge badge--neutral">20-Year Outlook · 6% p.a.</span>
	</div>

	<div class="chart-wrap">
		<canvas bind:this={canvas} aria-label="20-year wealth projection line chart"></canvas>
	</div>

	{#if projection.length}
		<div class="summary-row">
			<div class="summary-item">
				<span class="summary-label">Current</span>
				<span class="summary-value metric-value">{formatK(projection[0].value)}</span>
			</div>
			<div class="summary-arrow">→</div>
			<div class="summary-item">
				<span class="summary-label">10 Years</span>
				<span class="summary-value metric-value" style="color: var(--color-primary)"
					>{formatK(projection[10]?.value ?? 0)}</span
				>
			</div>
			<div class="summary-arrow">→</div>
			<div class="summary-item">
				<span class="summary-label">20 Years</span>
				<span class="summary-value metric-value" style="color: var(--color-accent)"
					>{formatK(projection[20]?.value ?? 0)}</span
				>
			</div>
		</div>
	{/if}
</div>

<style>
	.projection-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-5);
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.chart-wrap {
		position: relative;
		height: 220px;
	}

	.chart-wrap canvas {
		width: 100% !important;
		height: 100% !important;
	}

	.summary-row {
		display: flex;
		align-items: center;
		gap: var(--space-4);
		flex-wrap: wrap;
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-4);
	}

	.summary-item {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.summary-label {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-weight: 500;
	}

	.summary-value {
		font-size: 1.125rem;
		color: var(--color-text-primary);
	}

	.summary-arrow {
		color: var(--color-text-muted);
		font-size: 0.875rem;
	}
</style>
