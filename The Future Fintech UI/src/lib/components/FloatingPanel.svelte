<script lang="ts">
	import { onMount } from 'svelte';

	export let title: string;
	export let delay: number = 0;
	export let parallaxIntensity: number = 0.02;

	let container: HTMLDivElement;
	let mounted = false;
	let transformX = 0;
	let transformY = 0;

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, delay);

		const handleMouseMove = (e: MouseEvent) => {
			const rect = container.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const deltaX = (e.clientX - centerX) * parallaxIntensity;
			const deltaY = (e.clientY - centerY) * parallaxIntensity;

			transformX = deltaX;
			transformY = deltaY;
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	});
</script>

<div
	bind:this={container}
	class="floating-panel"
	class:mounted
	style="transform: translate({transformX}px, {transformY}px);"
	role="region"
	aria-label={title}
>
	<h3 class="text-lg font-semibold text-text-primary mb-4">{title}</h3>
	<slot />
</div>

<style>
	.floating-panel {
		background: #11161d;
		border: 1px solid #1f2630;
		border-radius: 12px;
		padding: 20px;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 400ms ease-out,
			transform 400ms ease-out,
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.floating-panel.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.floating-panel:hover {
		border-color: rgba(0, 255, 163, 0.25);
		box-shadow: 0 0 20px rgba(0, 255, 163, 0.12);
	}

	.floating-panel:focus-within {
		outline: 2px solid rgba(0, 255, 163, 0.5);
		outline-offset: 2px;
	}
</style>
