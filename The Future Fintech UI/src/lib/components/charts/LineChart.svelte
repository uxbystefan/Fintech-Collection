<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;

	// Generate multiple line series
	const generateMultiSeries = () => {
		const series = ['BTC', 'ETH', 'SOL'];
		const colors = ['#00FFA3', '#00D98C', '#9AA6B2'];
		const now = new Date();

		return series.map((name, seriesIndex) => {
			const data = [];
			let value = 100 + seriesIndex * 20;

			for (let i = 20; i >= 0; i--) {
				const date = new Date(now);
				date.setHours(date.getHours() - i);

				value += (Math.random() - 0.5) * 10;
				data.push({
					date,
					value: Math.max(value, 20),
					series: name
				});
			}

			return {
				name,
				color: colors[seriesIndex],
				data
			};
		});
	};

	const series = generateMultiSeries();

	onMount(() => {
		mounted = true;
	});

	const width = 700;
	const height = 300;
	const padding = { left: 50, right: 20, top: 40, bottom: 30 };
	const chartWidth = width - padding.left - padding.right;
	const chartHeight = height - padding.top - padding.bottom;

	// Calculate overall min/max
	const allValues = series.flatMap(s => s.data.map(d => d.value));
	const maxValue = Math.max(...allValues);
	const minValue = Math.min(...allValues);

	function generateLinePath(data: any[]) {
		return data.map((d, i) => {
			const x = padding.left + (i / (data.length - 1)) * chartWidth;
			const y = padding.top + (1 - (d.value - minValue) / (maxValue - minValue)) * chartHeight;
			return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
		}).join(' ');
	}
</script>

<div class="chart-wrapper" class:mounted>
	<div class="legend">
		{#each series as s}
			<div class="legend-item">
				<div class="legend-color" style="background-color: {s.color};" />
				<span class="legend-label">{s.name}</span>
			</div>
		{/each}
	</div>

	<svg viewBox="0 0 {width} {height}" class="line-chart">
		<!-- Grid lines -->
		{#each [0, 0.25, 0.5, 0.75, 1] as tick}
			<line
				x1={padding.left}
				y1={padding.top + tick * chartHeight}
				x2={padding.left + chartWidth}
				y2={padding.top + tick * chartHeight}
				stroke="#1F2630"
				stroke-width="1"
			/>
		{/each}

		<!-- Lines -->
		{#each series as s, i}
			<path
				d={generateLinePath(s.data)}
				fill="none"
				stroke={s.color}
				stroke-width="2"
				class="line-path"
				style="animation-delay: {i * 0.2}s"
			/>
		{/each}
	</svg>
</div>

<style>
	.chart-wrapper {
		width: 100%;
		height: 300px;
		position: relative;
		opacity: 0;
		transition: opacity 400ms ease-out;
	}

	.chart-wrapper.mounted {
		opacity: 1;
	}

	.legend {
		display: flex;
		gap: 20px;
		margin-bottom: 12px;
		justify-content: center;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.legend-color {
		width: 12px;
		height: 12px;
		border-radius: 2px;
	}

	.legend-label {
		font-size: 13px;
		color: #9aa6b2;
		font-weight: 600;
	}

	.line-chart {
		width: 100%;
		height: 250px;
	}

	.line-path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: draw-line 1.2s ease-out forwards;
	}

	@keyframes draw-line {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
