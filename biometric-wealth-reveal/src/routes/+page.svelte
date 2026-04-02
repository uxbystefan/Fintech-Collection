<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { Shield, Lock, Eye, ShieldCheck } from 'lucide-svelte';
	import PortfolioCard from '$lib/components/PortfolioCard.svelte';
	import BiometricButton from '$lib/components/BiometricButton.svelte';
	import { portfolioData } from '$lib/data';

	let mounted = $state(false);
	let isRevealed = $state(false);
	let tweenProgress = $state(0);
	let animFrame: number;

	onMount(() => {
		mounted = true;
		return () => {
			if (animFrame) cancelAnimationFrame(animFrame);
		};
	});

	function easeOutCubic(t: number): number {
		return 1 - Math.pow(1 - t, 3);
	}

	function handleReveal() {
		isRevealed = true;
		const duration = 800;
		const start = performance.now();

		function tick(now: number) {
			const elapsed = now - start;
			const raw = Math.min(elapsed / duration, 1);
			tweenProgress = easeOutCubic(raw);
			if (raw < 1) {
				animFrame = requestAnimationFrame(tick);
			}
		}

		animFrame = requestAnimationFrame(tick);
	}
</script>

<div class="screen">
	<!-- Ambient background -->
	<div class="ambient-orb orb-1"></div>
	<div class="ambient-orb orb-2"></div>
	<div class="bg-noise"></div>

	{#if mounted}
		<!-- Top Status Bar -->
		<header class="top-bar" in:fade={{ duration: 400, delay: 100 }}>
			<div class="top-left">
				<Shield size={13} strokeWidth={1.5} color="#45D6EF" />
				<span class="top-label">Vault Protected</span>
			</div>
			<div class="top-center">
				<div class="connection-dot"></div>
			</div>
			<div class="top-right">
				<Lock size={11} strokeWidth={1.5} color="#555B68" />
				<span class="top-label muted">E2E Encrypted</span>
			</div>
		</header>

		<!-- Portfolio Card -->
		<main class="card-container" in:fly={{ y: 40, duration: 600, delay: 200, easing: cubicOut }}>
			<PortfolioCard
				assets={portfolioData.assets}
				{isRevealed}
				{tweenProgress}
			/>
		</main>

		<!-- Biometric Trigger -->
		{#if !isRevealed}
			<footer class="bottom-area" in:fly={{ y: 30, duration: 500, delay: 400, easing: cubicOut }}>
				<BiometricButton onReveal={handleReveal} />
			</footer>
		{/if}
	{/if}
</div>

<style>
	.screen {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		padding: 28px 16px 10px;
		overflow: hidden;
	}

	/* --- Ambient Background --- */
	.ambient-orb {
		position: absolute;
		border-radius: 50%;
		pointer-events: none;
		filter: blur(60px);
	}

	.orb-1 {
		top: -80px;
		left: -40px;
		width: 250px;
		height: 250px;
		background: rgba(69, 214, 239, 0.03);
		animation: orb-drift 8s ease-in-out infinite alternate;
	}

	.orb-2 {
		bottom: -60px;
		right: -30px;
		width: 200px;
		height: 200px;
		background: rgba(123, 140, 222, 0.025);
		animation: orb-drift 10s ease-in-out 2s infinite alternate-reverse;
	}

	@keyframes orb-drift {
		from { transform: translate(0, 0) scale(1); }
		to { transform: translate(15px, 10px) scale(1.1); }
	}

	.bg-noise {
		position: absolute;
		inset: 0;
		opacity: 0.25;
		mix-blend-mode: overlay;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-repeat: repeat;
		background-size: 128px 128px;
	}

	/* --- Top Bar --- */
	.top-bar {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
		z-index: 1;
	}

	.top-left, .top-right {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.top-center {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	.connection-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: #45D6EF;
		box-shadow: 0 0 8px rgba(69, 214, 239, 0.4);
		animation: dot-blink 3s ease-in-out infinite;
	}

	@keyframes dot-blink {
		0%, 100% { opacity: 0.4; }
		50% { opacity: 1; }
	}

	.top-label {
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: rgba(69, 214, 239, 0.6);
		text-transform: uppercase;
	}

	.top-label.muted {
		color: rgba(85, 91, 104, 0.7);
	}

	/* --- Card Container --- */
	.card-container {
		flex: 1;
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 8px;
		z-index: 1;
		min-height: 0;
	}

	/* --- Reveal Badge --- */
	.reveal-badge {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 5px 12px;
		border-radius: 20px;
		background: rgba(52, 211, 153, 0.05);
		border: 1px solid rgba(52, 211, 153, 0.12);
		color: #34D399;
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 0.04em;
		margin: 18px 0 4px;
		z-index: 1;
	}

	/* --- Bottom --- */
	.bottom-area {
		width: 100%;
		z-index: 1;
		padding-top: 10px;
	}

	.revealed-footer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding: 6px 0;
	}

	.revealed-text {
		font-size: 10px;
		font-weight: 500;
		color: var(--text-muted, #555B68);
		letter-spacing: 0.04em;
	}

	.session-bar {
		width: 100px;
		height: 2px;
		border-radius: 1px;
		background: rgba(69, 214, 239, 0.08);
		overflow: hidden;
	}

	.session-fill {
		height: 100%;
		width: 100%;
		background: linear-gradient(90deg, rgba(69, 214, 239, 0.4), rgba(52, 211, 153, 0.3));
		border-radius: 1px;
		animation: session-drain 60s linear forwards;
	}

	@keyframes session-drain {
		from { width: 100%; }
		to { width: 0%; }
	}
</style>
