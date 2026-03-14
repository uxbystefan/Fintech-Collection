<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;

	const data = [
		{ category: 'Trading', value: 124500, change: 12.4 },
		{ category: 'Investments', value: 98200, change: 8.2 },
		{ category: 'Advisory', value: 76800, change: -3.1 },
		{ category: 'Lending', value: 64300, change: 15.7 },
		{ category: 'Insurance', value: 52100, change: 5.3 }
	];

	onMount(() => {
		mounted = true;
	});

	const width = 600;
	const height = 300;
	const padding = { left: 100, right: 20, top: 20, bottom: 40 };
	const chartWidth = width - padding.left - padding.right;
	const chartHeight = height - padding.top - padding.bottom;

	const maxValue = Math.max(...data.map(d => d.value));
	const barHeight = chartHeight / data.length * 0.6;
	const barSpacing = chartHeight / data.length;
</script>

<div class="chart-wrapper" class:mounted>
	<svg viewBox="0 0 {width} {height}" class="bar-chart">
		{#each data as item, i}
			<g transform="translate(0, {padding.top + i * barSpacing})">
				<!-- Bar background -->
				<rect
					x={padding.left}
					y="0"
					width={(item.value / maxValue) * chartWidth}
					height={barHeight}
					fill="rgba(0, 255, 163, 0.2)"
					stroke="#00FFA3"
					stroke-width="1"
					rx="4"
					class="bar"
					style="animation-delay: {i * 0.1}s"
				/>
				<!-- Label -->
				<text
					x={padding.left - 10}
					y={barHeight / 2 + 4}
					text-anchor="end"
					class="bar-label"
				>
					{item.category}
				</text>
				<!-- Value -->
				<text
					x={padding.left + (item.value / maxValue) * chartWidth + 10}
					y={barHeight / 2 + 4}
					class="bar-value"
				>
					${item.value.toLocaleString()}
				</text>
			</g>
		{/each}
	</svg>
</div>

<style>
	.chart-wrapper {
		width: 100%;
		height: 300px;
		opacity: 0;
		transition: opacity 400ms ease-out;
	}

	.chart-wrapper.mounted {
		opacity: 1;
	}

	.bar-chart {
		width: 100%;
		height: 100%;
	}

	.bar {
		opacity: 0;
		animation: slide-in 0.6s ease-out forwards;
		transition: all 250ms ease;
	}

	.bar:hover {
		fill: rgba(0, 255, 163, 0.4);
		stroke-width: 2;
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: scaleX(0);
		}
		to {
			opacity: 1;
			transform: scaleX(1);
		}
	}

	.bar-label {
		font-size: 13px;
		fill: #e6edf3;
		font-weight: 500;
	}

	.bar-value {
		font-size: 12px;
		fill: #9aa6b2;
		font-weight: 600;
	}
</style>
