<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = false;
	let dataPoints: Array<{ x: number; y: number; delay: number }> = [];

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 800);

		// Generate data points for visualization
		const count = 8;
		const centerX = 200;
		const centerY = 200;
		const radius = 120;

		for (let i = 0; i < count; i++) {
			const angle = (i / count) * Math.PI * 2;
			dataPoints.push({
				x: centerX + Math.cos(angle) * radius,
				y: centerY + Math.sin(angle) * radius,
				delay: i * 0.1
			});
		}

		dataPoints = dataPoints;
	});

	function generatePath(index: number, total: number): string {
		const centerX = 200;
		const centerY = 200;
		const point = dataPoints[index];

		if (!point) return '';

		// Create curved path from center to point
		const controlX = centerX + (point.x - centerX) * 0.5;
		const controlY = centerY + (point.y - centerY) * 0.5;

		return `M ${centerX} ${centerY} Q ${controlX} ${controlY} ${point.x} ${point.y}`;
	}
</script>

<div class="visualization-container" class:mounted role="img" aria-label="Financial data visualization">
	<svg viewBox="0 0 400 400" class="w-full h-full">
		<!-- Grid lines -->
		<defs>
			<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
				<path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1F2630" stroke-width="0.5" />
			</pattern>
			
			<filter id="glow">
				<feGaussianBlur stdDeviation="2" result="coloredBlur" />
				<feMerge>
					<feMergeNode in="coloredBlur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<rect width="400" height="400" fill="url(#grid)" opacity="0.3" />

		<!-- Center point -->
		<circle cx="200" cy="200" r="8" fill="#00FFA3" class="pulse-center" filter="url(#glow)" />
		
		<circle cx="200" cy="200" r="12" fill="none" stroke="#00FFA3" stroke-width="1" opacity="0.3" class="pulse-ring" />

		<!-- Data flow lines -->
		{#each dataPoints as point, i}
			<path
				d={generatePath(i, dataPoints.length)}
				fill="none"
				stroke="#00FFA3"
				stroke-width="1.5"
				opacity="0.6"
				class="data-line"
				style="animation-delay: {point.delay}s"
			/>

			<!-- Outer points -->
			<circle
				cx={point.x}
				cy={point.y}
				r="4"
				fill="#00FFA3"
				class="data-point"
				style="animation-delay: {point.delay}s"
				filter="url(#glow)"
			/>

			<!-- Moving particles along lines -->
			<circle r="2" fill="#00D98C" class="particle" style="animation-delay: {point.delay}s">
				<animateMotion dur="3s" repeatCount="indefinite" begin="{point.delay}s">
					<mpath href="#{`path-${i}`}" />
				</animateMotion>
			</circle>
		{/each}

		<!-- Central rings -->
		<circle
			cx="200"
			cy="200"
			r="40"
			fill="none"
			stroke="#00FFA3"
			stroke-width="0.5"
			opacity="0.2"
			class="orbit-ring"
		/>
		<circle
			cx="200"
			cy="200"
			r="70"
			fill="none"
			stroke="#00FFA3"
			stroke-width="0.5"
			opacity="0.15"
			class="orbit-ring orbit-ring-2"
		/>
	</svg>
</div>

<style>
	.visualization-container {
		width: 400px;
		height: 400px;
		opacity: 0;
		transform: scale(0.8);
		transition:
			opacity 400ms ease-out,
			transform 400ms ease-out;
	}

	.visualization-container.mounted {
		opacity: 1;
		transform: scale(1);
	}

	.pulse-center {
		animation: pulse-glow 2s ease-in-out infinite;
	}

	.pulse-ring {
		animation: pulse-ring 2s ease-in-out infinite;
	}

	@keyframes pulse-glow {
		0%,
		100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(1.1);
		}
	}

	@keyframes pulse-ring {
		0% {
			r: 12px;
			opacity: 0.3;
		}
		50% {
			r: 20px;
			opacity: 0;
		}
		100% {
			r: 12px;
			opacity: 0.3;
		}
	}

	.data-line {
		stroke-dasharray: 200;
		stroke-dashoffset: 200;
		animation: draw-line 2s ease-out forwards;
	}

	@keyframes draw-line {
		to {
			stroke-dashoffset: 0;
		}
	}

	.data-point {
		opacity: 0;
		animation:
			fade-in 0.5s ease-out forwards,
			pulse-point 3s ease-in-out infinite;
	}

	@keyframes fade-in {
		to {
			opacity: 1;
		}
	}

	@keyframes pulse-point {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.3);
			opacity: 0.7;
		}
	}

	.orbit-ring {
		animation: rotate-orbit 20s linear infinite;
		transform-origin: center;
	}

	.orbit-ring-2 {
		animation-duration: 30s;
		animation-direction: reverse;
	}

	@keyframes rotate-orbit {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.particle {
		opacity: 0.8;
		filter: blur(1px);
	}
</style>
