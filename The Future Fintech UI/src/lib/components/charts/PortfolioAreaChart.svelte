<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;

	// Generate portfolio value over time
	const generatePortfolioData = () => {
		const data = [];
		const now = new Date();
		let value = 150000;

		for (let i = 90; i >= 0; i--) {
			const date = new Date(now);
			date.setDate(date.getDate() - i);

			// Add some realistic market volatility
			const trend = 300; // Upward trend
			const volatility = (Math.random() - 0.48) * 3000;
			value += trend + volatility;

			data.push({
				date,
				value: Math.max(value, 100000),
				volume: Math.random() * 500000 + 100000
			});
		}

		return data;
	};

	const data = generatePortfolioData();
	const currentValue = data[data.length - 1].value;
	const startValue = data[0].value;
	const percentChange = (((currentValue - startValue) / startValue) * 100).toFixed(2);

	onMount(() => {
		mounted = true;
	});

	// SVG dimensions
	const width = 800;
	const height = 300;
	const padding = { left: 60, right: 20, top: 20, bottom: 30 };
	const chartWidth = width - padding.left - padding.right;
	const chartHeight = height - padding.top - padding.bottom;

	// Calculate scales
	const maxValue = Math.max(...data.map(d => d.value));
	const minValue = Math.min(...data.map(d => d.value));

	// Generate SVG path
	function generatePath() {
		const points = data.map((d, i) => {
			const x = padding.left + (i / (data.length - 1)) * chartWidth;
			const y = padding.top + (1 - (d.value - minValue) / (maxValue - minValue)) * chartHeight;
			return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
		});
		return points.join(' ');
	}

	function generateAreaPath() {
		const linePath = generatePath();
		const lastPoint = data[data.length - 1];
		const lastX = padding.left + chartWidth;
		const bottomY = padding.top + chartHeight;
		return `${linePath} L ${lastX} ${bottomY} L ${padding.left} ${bottomY} Z`;
	}
</script>

<div class="area-chart-wrapper" class:mounted>
	<div class="chart-header">
		<div>
			<div class="chart-value">${currentValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
			<div class="chart-change" class:positive={Number(percentChange) > 0}>
				{Number(percentChange) > 0 ? '+' : ''}{percentChange}% (90 days)
			</div>
		</div>
	</div>

	<svg viewBox="0 0 {width} {height}" class="portfolio-chart">
		<defs>
			<linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" style="stop-color: rgba(0, 255, 163, 0.3); stop-opacity: 1" />
				<stop offset="100%" style="stop-color: rgba(0, 255, 163, 0); stop-opacity: 1" />
			</linearGradient>
		</defs>

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
			<text
				x={padding.left - 10}
				y={padding.top + tick * chartHeight + 4}
				text-anchor="end"
				class="axis-label"
			>
				${Math.round(maxValue - tick * (maxValue - minValue)).toLocaleString()}
			</text>
		{/each}

		<!-- Area fill -->
		<path
			d={generateAreaPath()}
			fill="url(#areaGradient)"
			class="area-path"
		/>

		<!-- Line -->
		<path
			d={generatePath()}
			fill="none"
			stroke="#00FFA3"
			stroke-width="2"
			class="line-path"
		/>
	</svg>
</div>

<style>
	.area-chart-wrapper {
		width: 100%;
		height: 320px;
		opacity: 0;
		transition: opacity 400ms ease-out;
	}

	.area-chart-wrapper.mounted {
		opacity: 1;
	}

	.chart-header {
		margin-bottom: 16px;
	}

	.chart-value {
		font-size: 28px;
		font-weight: 700;
		color: #e6edf3;
		margin-bottom: 4px;
	}

	.chart-change {
		font-size: 14px;
		font-weight: 600;
		color: #ff4444;
	}

	.chart-change.positive {
		color: #00ffa3;
	}

	.portfolio-chart {
		width: 100%;
		height: 280px;
	}

	.axis-label {
		font-size: 11px;
		fill: #9aa6b2;
	}

	.line-path {
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: draw-line 1.5s ease-out forwards;
	}

	.area-path {
		opacity: 0;
		animation: fade-in 1s ease-out 0.5s forwards;
	}

	@keyframes draw-line {
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}
</style>
