<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;

	// Generate sparkline data
	const generateSparklineData = (baseValue: number, variance: number) => {
		const data = [];
		let value = baseValue;

		for (let i = 0; i < 20; i++) {
			value += (Math.random() - 0.5) * variance;
			data.push({
				index: i,
				value: Math.max(value, baseValue * 0.5)
			});
		}

		return data;
	};

	export let data = generateSparklineData(100, 10);
	export let color = '#00FFA3';
	export let showGradient = true;

	onMount(() => {
		mounted = true;
	});

	const width = 200;
	const height = 60;
	const padding = { left: 2, right: 2, top: 4, bottom: 2 };
	const chartWidth = width - padding.left - padding.right;
	const chartHeight = height - padding.top - padding.bottom;

	const maxValue = Math.max(...data.map(d => d.value));
	const minValue = Math.min(...data.map(d => d.value));

	function generatePath() {
		return data.map((d, i) => {
			const x = padding.left + (i / (data.length - 1)) * chartWidth;
			const y = padding.top + (1 - (d.value - minValue) / (maxValue - minValue)) * chartHeight;
			return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
		}).join(' ');
	}

	function generateAreaPath() {
		const linePath = generatePath();
		const lastX = padding.left + chartWidth;
		const bottomY = padding.top + chartHeight;
		return `${linePath} L ${lastX} ${bottomY} L ${padding.left} ${bottomY} Z`;
	}
</script>

<div class="sparkline-wrapper" class:mounted>
	<svg viewBox="0 0 {width} {height}" class="sparkline">
		{#if showGradient}
			<defs>
				<linearGradient id="sparklineGradient-{color}" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" style="stop-color: {color}; stop-opacity: 0.3" />
					<stop offset="100%" style="stop-color: {color}; stop-opacity: 0" />
				</linearGradient>
			</defs>
			<path
				d={generateAreaPath()}
				fill="url(#sparklineGradient-{color})"
				class="area"
			/>
		{/if}
		<path
			d={generatePath()}
			fill="none"
			stroke={color}
			stroke-width="2"
			class="line"
		/>
	</svg>
</div>

<style>
	.sparkline-wrapper {
		width: 100%;
		height: 60px;
		opacity: 0;
		transition: opacity 400ms ease-out;
	}

	.sparkline-wrapper.mounted {
		opacity: 1;
	}

	.sparkline {
		width: 100%;
		height: 100%;
	}

	.line {
		stroke-dasharray: 300;
		stroke-dashoffset: 300;
		animation: draw-sparkline 1s ease-out forwards;
	}

	.area {
		opacity: 0;
		animation: fade-in 0.8s ease-out 0.3s forwards;
	}

	@keyframes draw-sparkline {
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
