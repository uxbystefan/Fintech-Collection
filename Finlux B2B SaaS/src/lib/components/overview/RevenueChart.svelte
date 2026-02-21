<script lang="ts">
	import { onMount } from 'svelte';

	let activeTab = $state('6M');
	let chartData = [
		{ month: 'MAY', value: 800000 },
		{ month: 'JUN', value: 750000 },
		{ month: 'JUL', value: 900000 },
		{ month: 'AUG', value: 1100000 },
		{ month: 'SEP', value: 1050000 },
		{ month: 'OCT', value: 1420000 }
	];

	let canvasElement: HTMLCanvasElement;

	function drawChart() {
		if (!canvasElement) return;
		
		const ctx = canvasElement.getContext('2d');
		if (!ctx) return;

		const width = canvasElement.width;
		const height = canvasElement.height;
		const padding = 40;
		const chartWidth = width - padding * 2;
		const chartHeight = height - padding * 2;

		// Clear canvas
		ctx.clearRect(0, 0, width, height);

		// Calculate points
		const maxValue = Math.max(...chartData.map(d => d.value));
		const minValue = Math.min(...chartData.map(d => d.value)) * 0.9;
		const valueRange = maxValue - minValue;

		const points = chartData.map((d, i) => ({
			x: padding + (i / (chartData.length - 1)) * chartWidth,
			y: padding + chartHeight - ((d.value - minValue) / valueRange) * chartHeight,
			value: d.value
		}));

		// Create gradient
		const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
		gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
		gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

		// Draw filled area below the line
		ctx.beginPath();
		ctx.moveTo(points[0].x, height - padding);
		
		// Draw to first point
		ctx.lineTo(points[0].x, points[0].y);
		
		// Draw smooth curve through points
		for (let i = 0; i < points.length - 1; i++) {
			const xc = (points[i].x + points[i + 1].x) / 2;
			const yc = (points[i].y + points[i + 1].y) / 2;
			ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
		}
		
		// Draw to last point
		const lastPoint = points[points.length - 1];
		ctx.lineTo(lastPoint.x, lastPoint.y);
		
		// Close the path at the bottom
		ctx.lineTo(lastPoint.x, height - padding);
		ctx.closePath();
		
		// Fill with gradient
		ctx.fillStyle = gradient;
		ctx.fill();

		// Draw the line on top
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		
		for (let i = 0; i < points.length - 1; i++) {
			const xc = (points[i].x + points[i + 1].x) / 2;
			const yc = (points[i].y + points[i + 1].y) / 2;
			ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
		}
		
		ctx.lineTo(lastPoint.x, lastPoint.y);
		ctx.strokeStyle = '#3b82f6';
		ctx.lineWidth = 3;
		ctx.stroke();

		// Draw highlighted point at the end
		ctx.beginPath();
		ctx.arc(lastPoint.x, lastPoint.y, 6, 0, Math.PI * 2);
		ctx.fillStyle = '#3b82f6';
		ctx.fill();
		ctx.beginPath();
		ctx.arc(lastPoint.x, lastPoint.y, 4, 0, Math.PI * 2);
		ctx.fillStyle = '#0a0e1a';
		ctx.fill();

		// Draw x-axis labels
		ctx.fillStyle = '#94a3b8';
		ctx.font = '12px sans-serif';
		ctx.textAlign = 'center';
		chartData.forEach((d, i) => {
			const x = padding + (i / (chartData.length - 1)) * chartWidth;
			ctx.fillText(d.month, x, height - 15);
		});
	}

	onMount(() => {
		const resizeCanvas = () => {
			const container = canvasElement.parentElement;
			if (container) {
				canvasElement.width = container.clientWidth;
				canvasElement.height = 300;
				drawChart();
			}
		};

		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	});
</script>

<div class="revenue-chart-card">
	<div class="chart-header">
		<div>
			<h3 class="chart-title">Revenue Over Time</h3>
			<p class="chart-subtitle">Total processed volume across all channels</p>
		</div>
		
		<div class="chart-tabs">
			<button 
				class="tab-btn" 
				class:active={activeTab === '6M'}
				onclick={() => activeTab = '6M'}
			>
				6M
			</button>
			<button 
				class="tab-btn" 
				class:active={activeTab === '1Y'}
				onclick={() => activeTab = '1Y'}
			>
				1Y
			</button>
			<button 
				class="tab-btn" 
				class:active={activeTab === 'All'}
				onclick={() => activeTab = 'All'}
			>
				All
			</button>
		</div>
	</div>

	<div class="current-value">
		<div class="value-amount">$142,000.00</div>
		<div class="value-change">+1.45% 24hr</div>
	</div>

	<div class="chart-container">
		<canvas bind:this={canvasElement}></canvas>
	</div>
</div>

<style>
	.revenue-chart-card {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		padding: 1.5rem;
	}

	.chart-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 1.5rem;
	}

	.chart-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 0.25rem;
	}

	.chart-subtitle {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.chart-tabs {
		display: flex;
		gap: 0.5rem;
		background-color: var(--color-bg-tertiary);
		padding: 0.25rem;
		border-radius: 0.5rem;
	}

	.tab-btn {
		padding: 0.5rem 1rem;
		background: none;
		border: none;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		font-weight: 500;
		border-radius: 0.375rem;
		transition: all 0.2s;
	}

	.tab-btn:hover {
		color: var(--color-text-primary);
	}

	.tab-btn.active {
		background-color: var(--color-accent);
		color: white;
	}

	.current-value {
		margin-bottom: 1rem;
	}

	.value-amount {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: 0.25rem;
	}

	.value-change {
		font-size: 0.875rem;
		color: var(--color-success);
	}

	.chart-container {
		position: relative;
		width: 100%;
		height: 300px;
	}

	canvas {
		width: 100%;
		height: 100%;
	}
</style>
