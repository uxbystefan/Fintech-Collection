<script lang="ts">
	import { onMount } from 'svelte';
	import { computePosition, offset, arrow } from '@floating-ui/dom';
	import AnimatedBackground from '$lib/components/AnimatedBackground.svelte';
	import CommandConsole from '$lib/components/CommandConsole.svelte';
	import CentralVisualization from '$lib/components/CentralVisualization.svelte';
	import FloatingPanel from '$lib/components/FloatingPanel.svelte';
	import MetricCard from '$lib/components/MetricCard.svelte';
	import MarketSentiment from '$lib/components/MarketSentiment.svelte';
	import CryptoHeatmap from '$lib/components/CryptoHeatmap.svelte';

	let headlineVisible = false;
	let subheadlineVisible = false;
	let signalActive = false;

	onMount(() => {
		// Sequence animations
		setTimeout(() => {
			headlineVisible = true;
		}, 1200);

		setTimeout(() => {
			subheadlineVisible = true;
		}, 1400);

		// Listen for command events
		const handleCommand = (e: CustomEvent) => {
			signalActive = true;
			setTimeout(() => {
				signalActive = false;
			}, 2000);
		};

		window.addEventListener('command', handleCommand as EventListener);

		return () => {
			window.removeEventListener('command', handleCommand as EventListener);
		};
	});
</script>

<svelte:head>
	<title>Future Fintech - AI-Powered Financial Operating System</title>
	<meta
		name="description"
		content="Next-generation financial operating system powered by artificial intelligence"
	/>
</svelte:head>

<div class="hero-container">
	<AnimatedBackground />

	<div class="hero-content">
		<!-- Hero headline -->
		<div class="headline-section">
			<h1 class="headline" class:visible={headlineVisible}>
				Your Financial Operating System
			</h1>
			<p class="subheadline" class:visible={subheadlineVisible}>
				AI-powered insights, real-time analytics, and autonomous portfolio management
			</p>

			<div class="cta-buttons" class:visible={subheadlineVisible}>
				<a href="/charts" class="cta-primary">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
						/>
					</svg>
					View Analytics
				</a>
			</div>

			{#if signalActive}
				<div class="signal-pulse">
					<span class="signal-text">Processing command...</span>
				</div>
			{/if}
		</div>

		<!-- Main interactive area -->
		<div class="main-area">
			<!-- Left panels -->
			<div class="panel-column left">
				<FloatingPanel title="Market Sentiment" delay={400}>
					<MarketSentiment />
				</FloatingPanel>

				<FloatingPanel title="Portfolio Growth" delay={500}>
					<MetricCard value={247850} change={12.4} prefix="$" />
				</FloatingPanel>
			</div>

			<!-- Center: Visualization + Console -->
			<div class="center-column">
				<div class="visualization-wrapper">
					<CentralVisualization />
				</div>

				<div class="console-wrapper">
					<CommandConsole />
				</div>
			</div>

			<!-- Right panels -->
			<div class="panel-column right">
				<FloatingPanel title="Revenue Forecast" delay={600}>
					<MetricCard value={1240000} change={8.2} prefix="$" suffix="/mo" />
				</FloatingPanel>

				<FloatingPanel title="Crypto Heatmap" delay={700}>
					<CryptoHeatmap />
				</FloatingPanel>
			</div>
		</div>

		<!-- Bottom stats bar -->
		<div class="stats-bar">
			<div class="stat-item">
				<div class="stat-value">$2.4M</div>
				<div class="stat-label">Total Volume</div>
			</div>
			<div class="stat-divider" />
			<div class="stat-item">
				<div class="stat-value">12,847</div>
				<div class="stat-label">Active Users</div>
			</div>
			<div class="stat-divider" />
			<div class="stat-item">
				<div class="stat-value">99.9%</div>
				<div class="stat-label">Uptime</div>
			</div>
			<div class="stat-divider" />
			<div class="stat-item">
				<div class="stat-value">42ms</div>
				<div class="stat-label">Latency</div>
			</div>
		</div>
	</div>
</div>

<style>
	.hero-container {
		position: relative;
		min-height: 100vh;
		width: 100%;
		overflow: hidden;
		background: #0b0f14;
	}

	.hero-content {
		position: relative;
		z-index: 10;
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 60px 40px 40px;
	}

	.headline-section {
		text-align: center;
		margin-bottom: 60px;
		position: relative;
	}

	.headline {
		font-size: 56px;
		font-weight: 700;
		color: #e6edf3;
		margin: 0 0 20px;
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 400ms ease-out,
			transform 400ms ease-out;
		line-height: 1.2;
	}

	.headline.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.subheadline {
		font-size: 20px;
		color: #9aa6b2;
		margin: 0;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 400ms ease-out,
			transform 400ms ease-out;
		transition-delay: 100ms;
	}

	.subheadline.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.cta-buttons {
		display: flex;
		gap: 16px;
		justify-content: center;
		margin-top: 32px;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 400ms ease-out,
			transform 400ms ease-out;
		transition-delay: 200ms;
	}

	.cta-buttons.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.cta-primary {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 14px 32px;
		background: linear-gradient(135deg, rgba(0, 255, 163, 0.15), rgba(0, 217, 140, 0.15));
		border: 2px solid rgba(0, 255, 163, 0.3);
		border-radius: 10px;
		color: #00ffa3;
		text-decoration: none;
		font-size: 16px;
		font-weight: 600;
		transition:
			all 150ms ease,
			transform 150ms ease;
		box-shadow: 0 0 20px rgba(0, 255, 163, 0.15);
	}

	.cta-primary:hover {
		border-color: rgba(0, 255, 163, 0.5);
		box-shadow: 0 0 30px rgba(0, 255, 163, 0.25);
		transform: translateY(-2px);
		background: linear-gradient(135deg, rgba(0, 255, 163, 0.2), rgba(0, 217, 140, 0.2));
	}

	.cta-primary:focus {
		outline: 2px solid rgba(0, 255, 163, 0.5);
		outline-offset: 4px;
	}

	.signal-pulse {
		position: absolute;
		top: calc(100% + 20px);
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 255, 163, 0.1);
		border: 1px solid rgba(0, 255, 163, 0.3);
		border-radius: 8px;
		padding: 8px 16px;
		animation: pulse-signal 0.5s ease-out;
	}

	.signal-text {
		color: #00ffa3;
		font-size: 14px;
		font-weight: 600;
	}

	@keyframes pulse-signal {
		0% {
			opacity: 0;
			transform: translateX(-50%) scale(0.9);
		}
		50% {
			opacity: 1;
			transform: translateX(-50%) scale(1.05);
		}
		100% {
			opacity: 1;
			transform: translateX(-50%) scale(1);
		}
	}

	.main-area {
		display: grid;
		grid-template-columns: 320px 1fr 320px;
		gap: 40px;
		width: 100%;
		max-width: 1600px;
		align-items: center;
		margin-bottom: 60px;
	}

	.panel-column {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.center-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40px;
	}

	.visualization-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.console-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.stats-bar {
		display: flex;
		align-items: center;
		gap: 40px;
		padding: 24px 40px;
		background: rgba(17, 22, 29, 0.6);
		border: 1px solid #1f2630;
		border-radius: 12px;
		backdrop-filter: blur(10px);
		opacity: 0;
		animation: slide-up 400ms ease-out forwards 2s;
	}

	@keyframes slide-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.stat-item {
		text-align: center;
	}

	.stat-value {
		font-size: 24px;
		font-weight: 700;
		color: #e6edf3;
		margin-bottom: 4px;
		font-variant-numeric: tabular-nums;
	}

	.stat-label {
		font-size: 13px;
		color: #7f8a96;
		text-transform: uppercase;
		letter-spacing: 0.5px;
	}

	.stat-divider {
		width: 1px;
		height: 40px;
		background: #1f2630;
	}

	@media (max-width: 1400px) {
		.main-area {
			grid-template-columns: 280px 1fr 280px;
			gap: 30px;
		}

		.headline {
			font-size: 48px;
		}
	}

	@media (max-width: 1024px) {
		.main-area {
			grid-template-columns: 1fr;
			gap: 24px;
		}

		.panel-column {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
		}

		.headline {
			font-size: 40px;
		}

		.stats-bar {
			flex-wrap: wrap;
			gap: 20px;
		}

		.stat-divider {
			display: none;
		}
	}
</style>
