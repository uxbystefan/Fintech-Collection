<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { ArrowDown, Shield, Zap, BarChart3 } from 'lucide-svelte';

	let heroEl: HTMLElement;
	let headlineEl: HTMLElement;
	let subtextEl: HTMLElement;
	let ctaEl: HTMLElement;
	let badgesEl: HTMLElement;
	let statsEl: HTMLElement;
	let gridEl: HTMLElement;

	onMount(() => {
		animate(gridEl, { opacity: [0, 1] }, { duration: 1.5, ease: 'linear' });
		animate(headlineEl, { opacity: [0, 1], y: [50, 0] }, { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 });
		animate(subtextEl, { opacity: [0, 1], y: [30, 0] }, { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.5 });
		animate(ctaEl, { opacity: [0, 1], y: [20, 0], scale: [0.95, 1] }, { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.7 });
		animate(badgesEl, { opacity: [0, 1], y: [15, 0] }, { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.9 });

		if (statsEl) {
			const statEls = statsEl.querySelectorAll('.hero-stat');
			statEls.forEach((el, i) => {
				animate(el as HTMLElement, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 1.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] });
			});
		}
	});

	function scrollToExplore() {
		const target = document.getElementById('interactive');
		target?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<section bind:this={heroEl} class="hero">
	<div class="hero-bg">
		<div class="grid-pattern" bind:this={gridEl} style="opacity: 0;"></div>
		<div class="gradient-orb orb-1"></div>
		<div class="gradient-orb orb-2"></div>
		<div class="gradient-orb orb-3"></div>
		<div class="radial-fade"></div>
	</div>

	<div class="particles">
		{#each Array(6) as _, i}
			<div class="particle" style="--delay: {i * 1.5}s; --x: {15 + i * 14}%; --size: {2 + (i % 3)}px; --duration: {8 + i * 2}s;"></div>
		{/each}
	</div>

	<div class="hero-content">
		<div class="hero-badge">
			<div class="badge-dot"></div>
			<span>Powered by smart projections</span>
		</div>

		<h1 bind:this={headlineEl} class="headline" style="opacity: 0;">
			Design Your Path to<br />
			<span class="highlight">Financial Freedom</span>
		</h1>

		<p bind:this={subtextEl} class="subtext" style="opacity: 0;">
			Explore how your investment decisions shape your future.<br class="hide-mobile" />
			Visualize compound growth over decades in real time.
		</p>

		<div bind:this={ctaEl} class="cta-row" style="opacity: 0;">
			<button class="cta-button" onclick={scrollToExplore}>
				<span>Start Exploring</span>
				<ArrowDown size={16} strokeWidth={2} />
			</button>
			<span class="cta-hint">No signup required · 100% private</span>
		</div>

		<div bind:this={badgesEl} class="trust-badges" style="opacity: 0;">
			<div class="trust-badge">
				<Shield size={14} strokeWidth={1.5} />
				<span>No Data Stored</span>
			</div>
			<div class="trust-divider"></div>
			<div class="trust-badge">
				<Zap size={14} strokeWidth={1.5} />
				<span>Real-time Calculations</span>
			</div>
			<div class="trust-divider"></div>
			<div class="trust-badge">
				<BarChart3 size={14} strokeWidth={1.5} />
				<span>Compound Growth</span>
			</div>
		</div>

		<div bind:this={statsEl} class="hero-stats">
			<div class="hero-stat">
				<span class="hero-stat-value font-tabular">$2.4M</span>
				<span class="hero-stat-label">Avg. 40yr projection</span>
			</div>
			<div class="hero-stat">
				<span class="hero-stat-value font-tabular">7.2%</span>
				<span class="hero-stat-label">Balanced return</span>
			</div>
			<div class="hero-stat">
				<span class="hero-stat-value font-tabular">18 yrs</span>
				<span class="hero-stat-label">Avg. to freedom</span>
			</div>
		</div>
	</div>

	<div class="scroll-indicator">
		<div class="scroll-line">
			<div class="scroll-dot"></div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		width: 100%;
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 6rem 1.5rem 4rem;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.grid-pattern {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(58, 134, 255, 0.08) 1px, transparent 1px);
		background-size: 40px 40px;
		mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 70%);
	}

	.gradient-orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(120px);
	}

	.orb-1 {
		width: 700px;
		height: 700px;
		top: -250px;
		right: -150px;
		background: radial-gradient(circle, rgba(58, 134, 255, 0.12) 0%, transparent 70%);
		animation: float-orb 12s ease-in-out infinite alternate;
	}

	.orb-2 {
		width: 500px;
		height: 500px;
		bottom: -200px;
		left: -100px;
		background: radial-gradient(circle, rgba(255, 122, 0, 0.06) 0%, transparent 70%);
		animation: float-orb 15s ease-in-out infinite alternate-reverse;
	}

	.orb-3 {
		width: 300px;
		height: 300px;
		top: 40%;
		left: 50%;
		transform: translateX(-50%);
		background: radial-gradient(circle, rgba(58, 134, 255, 0.06) 0%, transparent 70%);
		animation: pulse-center 8s ease-in-out infinite;
	}

	@keyframes float-orb {
		0% { transform: translate(0, 0) scale(1); }
		100% { transform: translate(40px, -30px) scale(1.15); }
	}

	@keyframes pulse-center {
		0%, 100% { transform: translateX(-50%) scale(0.9); opacity: 0.4; }
		50% { transform: translateX(-50%) scale(1.3); opacity: 0.8; }
	}

	.radial-fade {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse 80% 70% at 50% 45%, transparent 30%, #0B0B0F 75%);
	}

	.particles {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
	}

	.particle {
		position: absolute;
		width: var(--size);
		height: var(--size);
		background: rgba(58, 134, 255, 0.4);
		border-radius: 50%;
		left: var(--x);
		bottom: -10px;
		animation: rise var(--duration) ease-in-out var(--delay) infinite;
	}

	@keyframes rise {
		0% { transform: translateY(0) scale(0); opacity: 0; }
		10% { opacity: 0.6; transform: scale(1); }
		90% { opacity: 0.2; }
		100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
	}

	.hero-content {
		position: relative;
		z-index: 2;
		text-align: center;
		max-width: 800px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0.85rem;
		border-radius: 100px;
		background: rgba(58, 134, 255, 0.06);
		border: 1px solid rgba(58, 134, 255, 0.12);
		font-size: 0.75rem;
		font-weight: 500;
		color: #3A86FF;
		margin-bottom: 1.75rem;
		animation: badge-in 0.6s 0.1s ease both;
	}

	@keyframes badge-in {
		from { opacity: 0; transform: translateY(-10px) scale(0.95); }
		to { opacity: 1; transform: translateY(0) scale(1); }
	}

	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #3A86FF;
		animation: dot-pulse 2s ease-in-out infinite;
	}

	@keyframes dot-pulse {
		0%, 100% { opacity: 0.5; transform: scale(0.8); }
		50% { opacity: 1; transform: scale(1.2); }
	}

	.headline {
		font-size: clamp(2.8rem, 6.5vw, 5rem);
		font-weight: 800;
		line-height: 1.08;
		letter-spacing: -0.04em;
		color: #EAEAF0;
		margin-bottom: 1.25rem;
	}

	.highlight {
		color: #3A86FF;
	}

	.subtext {
		font-size: clamp(1rem, 2vw, 1.2rem);
		color: #A0A0B2;
		font-weight: 400;
		line-height: 1.7;
		margin-bottom: 2rem;
		max-width: 520px;
	}

	.hide-mobile { display: inline; }

	.cta-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 2.5rem;
	}

	.cta-button {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.9rem 2.25rem;
		font-size: 0.95rem;
		font-weight: 600;
		color: #EAEAF0;
		background: #3A86FF;
		border: none;
		border-radius: 12px;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 0 30px rgba(58, 134, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1);
		font-family: 'Inter', system-ui, sans-serif;
		position: relative;
		overflow: hidden;
	}

	.cta-button::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
		pointer-events: none;
	}

	.cta-button:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 50px rgba(58, 134, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12);
		background: #5a9bff;
	}

	.cta-button:active { transform: translateY(0); }

	.cta-hint {
		font-size: 0.72rem;
		color: #555B68;
		font-weight: 400;
		letter-spacing: 0.02em;
	}

	.trust-badges {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 3rem;
	}

	.trust-badge {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.72rem;
		font-weight: 500;
		color: #555B68;
	}

	.trust-divider {
		width: 1px;
		height: 12px;
		background: rgba(255, 255, 255, 0.06);
	}

	.hero-stats {
		display: flex;
		gap: 2.5rem;
	}

	.hero-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		opacity: 0;
	}

	.hero-stat-value {
		font-size: 1.35rem;
		font-weight: 800;
		color: #EAEAF0;
		letter-spacing: -0.02em;
	}

	.hero-stat-label {
		font-size: 0.68rem;
		color: #555B68;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.scroll-indicator {
		position: absolute;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 2;
		animation: fade-in 0.6s 1.5s ease both;
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.scroll-line {
		width: 1px;
		height: 40px;
		background: rgba(58, 134, 255, 0.1);
		position: relative;
		overflow: hidden;
		border-radius: 1px;
	}

	.scroll-dot {
		position: absolute;
		top: -4px;
		left: -1.5px;
		width: 4px;
		height: 12px;
		border-radius: 2px;
		background: #3A86FF;
		animation: scroll-move 2s ease-in-out infinite;
	}

	@keyframes scroll-move {
		0% { top: -12px; opacity: 0; }
		30% { opacity: 1; }
		100% { top: 40px; opacity: 0; }
	}

	@media (max-width: 640px) {
		.hide-mobile { display: none; }
		.hero-stats { gap: 1.5rem; }
		.hero-stat-value { font-size: 1.1rem; }
		.trust-badges { flex-wrap: wrap; justify-content: center; }
	}
</style>
