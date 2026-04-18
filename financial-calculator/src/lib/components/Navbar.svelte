<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';


	let navEl: HTMLElement;
	let scrolled = $state(false);

	onMount(() => {
		animate(navEl, { opacity: [0, 1], y: [-20, 0] }, { duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] });

		const handleScroll = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	function scrollTo(id: string) {
		const el = document.getElementById(id);
		el?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<nav bind:this={navEl} class="navbar" class:scrolled style="opacity: 0;">
	<div class="nav-inner">
		<div class="nav-links">
			<button class="nav-link" onclick={() => scrollTo('interactive')}>Explore</button>
			<button class="nav-link" onclick={() => scrollTo('snapshot')}>Milestones</button>
			<button class="nav-link" onclick={() => scrollTo('regret')}>Regret Mode</button>
		</div>

		<button class="nav-cta" onclick={() => scrollTo('interactive')}>
			Get Started
		</button>
	</div>
</nav>

<style>
	.navbar {
		position: fixed;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		width: calc(100% - 2rem);
		max-width: 900px;
		padding: 0.6rem 1.5rem;
		border-radius: 16px;
		background: rgba(11, 11, 15, 0.4);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		border: 1px solid rgba(255, 255, 255, 0.04);
		transition: all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
	}

	.navbar.scrolled {
		background: rgba(11, 11, 15, 0.85);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(58, 134, 255, 0.06);
		border-color: rgba(255, 255, 255, 0.06);
		top: 0.75rem;
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.nav-link {
		font-size: 0.8rem;
		font-weight: 500;
		color: #A0A0B2;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.4rem 0.75rem;
		border-radius: 8px;
		transition: all 0.2s ease;
		font-family: 'Inter', system-ui, sans-serif;
	}

	.nav-link:hover {
		color: #EAEAF0;
		background: rgba(255, 255, 255, 0.04);
	}

	.nav-cta {
		font-size: 0.8rem;
		font-weight: 600;
		color: #EAEAF0;
		background: #3A86FF;
		border: none;
		border-radius: 8px;
		padding: 0.4rem 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		font-family: 'Inter', system-ui, sans-serif;
		box-shadow: 0 0 20px rgba(58, 134, 255, 0.15);
	}

	.nav-cta:hover {
		background: #5a9bff;
		box-shadow: 0 0 30px rgba(58, 134, 255, 0.25);
		transform: translateY(-1px);
	}

	@media (max-width: 640px) {
		.nav-links {
			display: none;
		}
	}
</style>
