<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { ArrowRight } from 'lucide-svelte';

	let sectionEl: HTMLElement;
	let headlineEl: HTMLElement;
	let ctaEl: HTMLElement;
	let footerEl: HTMLElement;
	let hasAnimated = $state(false);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						hasAnimated = true;
						animate(headlineEl, { opacity: [0, 1], y: [30, 0] }, { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] });
						animate(ctaEl, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] });
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.2 }
		);
		if (sectionEl) observer.observe(sectionEl);
		return () => observer.disconnect();
	});

	function scrollToTop() {
		const target = document.getElementById('interactive');
		target?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<section class="closing-section" bind:this={sectionEl}>
	<div class="closing-bg">
		<div class="closing-orb"></div>
		<div class="closing-grid"></div>
	</div>

	<div class="closing-content">
		<h2 class="closing-headline" bind:this={headlineEl} style="opacity: 0;">
			Small decisions.<br />
			<span class="closing-highlight">Massive consequences.</span>
		</h2>

		<p class="closing-subtext">
			Every month you wait costs you thousands in compound growth.<br />
			Take control of your financial future today.
		</p>

		<div bind:this={ctaEl} class="cta-group" style="opacity: 0;">
			<button class="closing-cta-primary" onclick={scrollToTop}>
				<span>Recalculate Your Future</span>
				<ArrowRight size={16} strokeWidth={2} />
			</button>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="footer" bind:this={footerEl}>
	<div class="footer-inner">
		<p class="footer-disclaimer">
			For educational purposes only. Not financial advice. Past performance does not indicate future results.
		</p>

		<div class="footer-bottom">
			<span class="footer-copy">&copy; {new Date().getFullYear()} Financial Advisor</span>
			<div class="footer-links">
				<button class="footer-link" onclick={() => document.getElementById('interactive')?.scrollIntoView({ behavior: 'smooth' })}>Simulator</button>
				<button class="footer-link" onclick={() => document.getElementById('snapshot')?.scrollIntoView({ behavior: 'smooth' })}>Milestones</button>
				<button class="footer-link" onclick={() => document.getElementById('regret')?.scrollIntoView({ behavior: 'smooth' })}>Regret Mode</button>
			</div>
		</div>
	</div>
</footer>

<style>
	.closing-section {
		position: relative;
		width: 100%;
		min-height: 60vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 8rem 1.5rem 4rem;
		overflow: hidden;
	}

	.closing-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 60%;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(58, 134, 255, 0.08), transparent);
	}

	.closing-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
		z-index: 0;
	}

	.closing-orb {
		position: absolute;
		width: 600px;
		height: 600px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: radial-gradient(circle, rgba(58, 134, 255, 0.08) 0%, rgba(255, 122, 0, 0.03) 40%, transparent 70%);
		filter: blur(80px);
		animation: pulse-orb 6s ease-in-out infinite alternate;
	}

	.closing-grid {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(58, 134, 255, 0.03) 1px, transparent 1px);
		background-size: 50px 50px;
		mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 70%);
		-webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 10%, transparent 70%);
	}

	@keyframes pulse-orb {
		from { transform: translate(-50%, -50%) scale(0.95); opacity: 0.6; }
		to { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
	}

	.closing-content {
		position: relative;
		z-index: 1;
		text-align: center;
		max-width: 600px;
	}

	.closing-headline {
		font-size: clamp(2rem, 5vw, 3.5rem);
		font-weight: 800;
		line-height: 1.15;
		letter-spacing: -0.03em;
		color: #EAEAF0;
		margin-bottom: 1.25rem;
	}

	.closing-highlight {
		color: #3A86FF;
	}

	.closing-subtext {
		font-size: 1rem;
		color: #A0A0B2;
		line-height: 1.7;
		margin-bottom: 2.5rem;
	}

	.cta-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
	}

	.closing-cta-primary {
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

	.closing-cta-primary::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
		pointer-events: none;
	}

	.closing-cta-primary:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 0 50px rgba(58, 134, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12);
		background: #5a9bff;
	}

	.closing-cta-primary:active { transform: translateY(0); }

	/* Footer */
	.footer {
		width: 100%;
		padding: 3rem 1.5rem 2rem;
		border-top: 1px solid rgba(255, 255, 255, 0.04);
	}

	.footer-inner {
		max-width: 900px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
	}

	.footer-disclaimer {
		font-size: 0.7rem;
		color: #555B68;
		text-align: center;
		max-width: 480px;
		line-height: 1.5;
	}

	.footer-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.03);
	}

	.footer-copy {
		font-size: 0.68rem;
		color: #555B68;
	}

	.footer-links {
		display: flex;
		gap: 1rem;
	}

	.footer-link {
		font-size: 0.72rem;
		color: #555B68;
		background: none;
		border: none;
		cursor: pointer;
		font-family: 'Inter', system-ui, sans-serif;
		transition: color 0.2s ease;
		padding: 0;
	}

	.footer-link:hover {
		color: #A0A0B2;
	}
</style>
