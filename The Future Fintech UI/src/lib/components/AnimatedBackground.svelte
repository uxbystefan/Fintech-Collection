<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let animationId: number;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
		opacity: number;
	}

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const particles: Particle[] = [];
		const particleCount = 50;

		// Initialize particles
		for (let i = 0; i < particleCount; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				vx: (Math.random() - 0.5) * 0.3,
				vy: (Math.random() - 0.5) * 0.3,
				size: Math.random() * 2 + 1,
				opacity: Math.random() * 0.5 + 0.2
			});
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw grid
			ctx.strokeStyle = '#1F2630';
			ctx.lineWidth = 1;

			const gridSize = 40;
			for (let x = 0; x < canvas.width; x += gridSize) {
				ctx.beginPath();
				ctx.moveTo(x, 0);
				ctx.lineTo(x, canvas.height);
				ctx.stroke();
			}

			for (let y = 0; y < canvas.height; y += gridSize) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(canvas.width, y);
				ctx.stroke();
			}

			// Draw and update particles
			particles.forEach((particle) => {
				particle.x += particle.vx;
				particle.y += particle.vy;

				// Wrap around screen
				if (particle.x < 0) particle.x = canvas.width;
				if (particle.x > canvas.width) particle.x = 0;
				if (particle.y < 0) particle.y = canvas.height;
				if (particle.y > canvas.height) particle.y = 0;

				// Draw particle
				ctx.fillStyle = `rgba(0, 255, 163, ${particle.opacity})`;
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
				ctx.fill();

				// Draw subtle glow
				const gradient = ctx.createRadialGradient(
					particle.x,
					particle.y,
					0,
					particle.x,
					particle.y,
					particle.size * 4
				);
				gradient.addColorStop(0, `rgba(0, 255, 163, ${particle.opacity * 0.3})`);
				gradient.addColorStop(1, 'rgba(0, 255, 163, 0)');
				ctx.fillStyle = gradient;
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
				ctx.fill();
			});

			animationId = requestAnimationFrame(animate);
		};

		animate();

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener('resize', handleResize);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="fixed inset-0 w-full h-full pointer-events-none opacity-60"
	style="z-index: 0;"
/>
