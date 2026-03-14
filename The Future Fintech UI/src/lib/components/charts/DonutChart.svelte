<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;

	const data = [
		{ category: 'Stocks', value: 45, color: '#00FFA3' },
		{ category: 'Bonds', value: 25, color: '#00D98C' },
		{ category: 'Crypto', value: 15, color: '#9AA6B2' },
		{ category: 'Cash', value: 10, color: '#7F8A96' },
		{ category: 'Other', value: 5, color: '#627182' }
	];

	const total = data.reduce((sum, item) => sum + item.value, 0);

	// Calculate arc positions for donut
	let cumulativeValue = 0;
	const arcs = data.map((item) => {
		const startAngle = (cumulativeValue / total) * 360;
		cumulativeValue += item.value;
		const endAngle = (cumulativeValue / total) * 360;
		return {
			...item,
			startAngle,
			endAngle,
			percentage: ((item.value / total) * 100).toFixed(1)
		};
	});

	function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
		const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
		return {
			x: centerX + radius * Math.cos(angleInRadians),
			y: centerY + radius * Math.sin(angleInRadians)
		};
	}

	function describeArc(
		x: number,
		y: number,
		radius: number,
		startAngle: number,
		endAngle: number,
		innerRadius: number
	) {
		const start = polarToCartesian(x, y, radius, endAngle);
		const end = polarToCartesian(x, y, radius, startAngle);
		const innerStart = polarToCartesian(x, y, innerRadius, endAngle);
		const innerEnd = polarToCartesian(x, y, innerRadius, startAngle);

		const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

		return [
			'M',
			start.x,
			start.y,
			'A',
			radius,
			radius,
			0,
			largeArcFlag,
			0,
			end.x,
			end.y,
			'L',
			innerEnd.x,
			innerEnd.y,
			'A',
			innerRadius,
			innerRadius,
			0,
			largeArcFlag,
			1,
			innerStart.x,
			innerStart.y,
			'Z'
		].join(' ');
	}

	onMount(() => {
		mounted = true;
	});
</script>

<div class="donut-wrapper" class:mounted>
	<svg viewBox="0 0 200 200" class="donut-chart">
		{#each arcs as arc, i}
			<path
				d={describeArc(100, 100, 85, arc.startAngle, arc.endAngle, 55)}
				fill={arc.color}
				class="arc-segment"
				style="animation-delay: {i * 0.1}s"
			/>
		{/each}

		<!-- Center text -->
		<text x="100" y="95" text-anchor="middle" class="center-label">Portfolio</text>
		<text x="100" y="110" text-anchor="middle" class="center-value">$247K</text>
	</svg>

	<!-- Legend -->
	<div class="donut-legend">
		{#each arcs as arc}
			<div class="legend-row">
				<div class="legend-color" style="background-color: {arc.color};" />
				<div class="legend-details">
					<span class="legend-category">{arc.category}</span>
					<span class="legend-percentage">{arc.percentage}%</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.donut-wrapper {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		opacity: 0;
		transition: opacity 400ms ease-out;
	}

	.donut-wrapper.mounted {
		opacity: 1;
	}

	.donut-chart {
		width: 200px;
		height: 200px;
	}

	.arc-segment {
		opacity: 0;
		animation: fade-in 400ms ease-out forwards;
		transition: all 250ms ease;
		cursor: pointer;
	}

	.arc-segment:hover {
		opacity: 0.8;
		filter: brightness(1.2);
	}

	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}

	.center-label {
		font-size: 12px;
		fill: #9aa6b2;
		font-weight: 500;
	}

	.center-value {
		font-size: 18px;
		fill: #e6edf3;
		font-weight: 700;
	}

	.donut-legend {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}

	.legend-row {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 8px;
		border-radius: 6px;
		transition: background-color 150ms ease;
	}

	.legend-row:hover {
		background-color: rgba(0, 255, 163, 0.05);
	}

	.legend-color {
		width: 12px;
		height: 12px;
		border-radius: 3px;
		flex-shrink: 0;
	}

	.legend-details {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 1;
	}

	.legend-category {
		font-size: 13px;
		color: #e6edf3;
		font-weight: 500;
	}

	.legend-percentage {
		font-size: 13px;
		color: #9aa6b2;
		font-weight: 600;
	}
</style>
