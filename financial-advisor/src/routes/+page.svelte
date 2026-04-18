<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import InteractiveSection from '$lib/components/InteractiveSection.svelte';
	import FutureSnapshot from '$lib/components/FutureSnapshot.svelte';
	import RegretMode from '$lib/components/RegretMode.svelte';
	import ClosingSection from '$lib/components/ClosingSection.svelte';

	let monthlyIncome = $state(5000);
	let startingSavings = $state(10000);
	let allocation = $state({
		stocks: 40,
		crypto: 15,
		realEstate: 30,
		cash: 15
	});
</script>

<svelte:head>
	<title>Design Your Path to Financial Freedom</title>
	<meta name="description" content="Explore how your investment decisions shape your future. An interactive fintech experience." />
</svelte:head>

<Navbar />

<main>
	<Hero />
	<InteractiveSection bind:monthlyIncome bind:startingSavings bind:allocation />
	<FutureSnapshot {monthlyIncome} {startingSavings} {allocation} />
	<RegretMode {monthlyIncome} {startingSavings} {allocation} />
	<ClosingSection />
</main>

<style>
	main {
		width: 100%;
		overflow-x: hidden;
	}
</style>
