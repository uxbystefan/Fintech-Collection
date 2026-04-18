<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';
	import { getValueAtAge, formatCurrencyFull, type Allocation } from '$lib/finance';
	import { Target, Home, Gem, Palmtree, Clock } from 'lucide-svelte';

	let {
		monthlyIncome = 5000,
		startingSavings = 10000,
		allocation = { stocks: 40, crypto: 15, realEstate: 30, cash: 15 }
	}: {
		monthlyIncome?: number;
		startingSavings?: number;
		allocation?: Allocation;
	} = $props();

	let monthlyContribution = $derived(monthlyIncome * 0.3);
	let currentAge = 25;

	const milestones = [
		{ age: 30, icon: 'target', label: 'Early Start', years: 5 },
		{ age: 40, icon: 'home', label: 'Prime Years', years: 15 },
		{ age: 50, icon: 'gem', label: 'Peak Growth', years: 25 },
		{ age: 60, icon: 'palmtree', label: 'Freedom', years: 35 }
	];

	let values = $derived(milestones.map(m => ({
		...m,
		value: getValueAtAge(currentAge, m.age, startingSavings, monthlyContribution, allocation)
	})));

	let maxVal = $derived(Math.max(...values.map(v => v.value), 1));

	let sectionEl: HTMLElement;
	let cardNodes: HTMLElement[] = [];
	let counterNodes: HTMLElement[] = [];
	let hasAnimated = $state(false);

	function animateCount(el: HTMLElement, target: number, duration: number = 1500) {
		const start = performance.now();
		const update = (now: number) => {
			const progress = Math.min((now - start) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const current = Math.round(target * eased);
			el.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(current);
			if (progress < 1) requestAnimationFrame(update);
		};
		requestAnimationFrame(update);
	}

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && !hasAnimated) {
						hasAnimated = true;
						cardNodes.forEach((el, i) => {
							if (el) {
								animate(
									el,
									{ opacity: [0, 1], y: [40, 0], scale: [0.95, 1] },
									{ duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }
								);
							}
						});
						// Start counting animation after cards appear
						counterNodes.forEach((el, i) => {
							if (el) {
								setTimeout(() => animateCount(el, values[i].value), 200 + i * 120);
							}
						});
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.15 }
		);
		if (sectionEl) observer.observe(sectionEl);
		return () => observer.disconnect();
	});
</script>

<section id="snapshot" class="snapshot-section" bind:this={sectionEl}>
	<div class="snapshot-container">
		<div class="snapshot-header">
			<div class="section-label">
				<Clock size={14} strokeWidth={2} />
				<span>Future Milestones</span>
			</div>
			<h2 class="snapshot-title">Your Wealth Timeline</h2>
			<p class="snapshot-subtitle">See how your wealth grows at every stage of life.</p>
		</div>

		<div class="milestones-grid">
			{#each values as milestone, i}
				<div class="milestone-card" bind:this={cardNodes[i]} style="opacity: 0;">
					<div class="card-top">
						<div class="milestone-icon">
							{#if milestone.icon === 'target'}<Target size={24} strokeWidth={1.5} />
							{:else if milestone.icon === 'home'}<Home size={24} strokeWidth={1.5} />
							{:else if milestone.icon === 'gem'}<Gem size={24} strokeWidth={1.5} />
							{:else}<Palmtree size={24} strokeWidth={1.5} />
							{/if}
						</div>
						<div class="milestone-years font-tabular">{milestone.years}yr</div>
					</div>
					<div class="milestone-label">{milestone.label}</div>
					<div class="milestone-age">Age {milestone.age}</div>
					<div class="milestone-value font-tabular" bind:this={counterNodes[i]}>$0</div>
					<div class="milestone-bar-track">
						<div
							class="milestone-bar-fill"
							style="width: {Math.min(100, (milestone.value / maxVal) * 100)}%;"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.snapshot-section {
		width: 100%;
		padding: 6rem 1.5rem;
		position: relative;
	}

	.snapshot-section::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 60%;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(58, 134, 255, 0.12), transparent);
	}

	.snapshot-container {
		max-width: 900px;
		margin: 0 auto;
	}

	.snapshot-header {
		text-align: center;
		margin-bottom: 3rem;
	}

	.section-label {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.72rem;
		font-weight: 600;
		color: #3A86FF;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin-bottom: 0.75rem;
	}

	.snapshot-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 800;
		color: #EAEAF0;
		letter-spacing: -0.02em;
		margin-bottom: 0.75rem;
	}

	.snapshot-subtitle {
		font-size: 1.05rem;
		color: #A0A0B2;
	}

	.milestones-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}

	@media (max-width: 700px) {
		.milestones-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.milestone-card {
		background: rgba(18, 18, 26, 0.5);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.04);
		border-radius: 20px;
		padding: 1.5rem;
		transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.milestone-card::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(58, 134, 255, 0.1), transparent);
	}

	.milestone-card:hover {
		border-color: rgba(58, 134, 255, 0.15);
		box-shadow: 0 0 40px rgba(58, 134, 255, 0.06), 0 8px 32px rgba(0, 0, 0, 0.2);
		transform: translateY(-2px);
	}

	.card-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.milestone-icon {
		width: 44px;
		height: 44px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		background: rgba(58, 134, 255, 0.06);
		border: 1px solid rgba(58, 134, 255, 0.1);
		color: #3A86FF;
	}

	.milestone-years {
		font-size: 0.68rem;
		font-weight: 600;
		color: #7A7F8E;
		padding: 0.2rem 0.5rem;
		border-radius: 6px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.04);
	}

	.milestone-label {
		font-size: 0.72rem;
		font-weight: 600;
		color: #3A86FF;
		letter-spacing: 0.02em;
		margin-bottom: 0.2rem;
	}

	.milestone-age {
		font-size: 0.8rem;
		font-weight: 500;
		color: #B8B8C8;
		margin-bottom: 0.75rem;
	}

	.milestone-value {
		font-size: 1.35rem;
		font-weight: 800;
		color: #EAEAF0;
		margin-bottom: 1rem;
		line-height: 1.2;
	}

	.milestone-bar-track {
		width: 100%;
		height: 3px;
		background: rgba(255, 255, 255, 0.04);
		border-radius: 2px;
		overflow: hidden;
	}

	.milestone-bar-fill {
		height: 100%;
		background: linear-gradient(90deg, #3A86FF, #5a9bff);
		border-radius: 2px;
		transition: width 1s cubic-bezier(0.25, 0.1, 0.25, 1);
	}
</style>
