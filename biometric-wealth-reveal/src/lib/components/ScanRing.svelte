<script lang="ts">
	let { active = false, complete = false } = $props();
</script>

<div class="scan-ring" class:active class:complete>
	<div class="ring ring-outer"></div>
	<div class="ring ring-mid"></div>
	<div class="ring ring-inner"></div>
	<!-- Sweep line for scanning effect -->
	{#if active}
		<div class="sweep-line"></div>
	{/if}
</div>

<style>
	.scan-ring {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		z-index: 1;
	}

	.ring {
		position: absolute;
		border-radius: 50%;
		border: 1px solid transparent;
		opacity: 0;
		transition: opacity 0.3s ease, border-color 0.4s ease, box-shadow 0.4s ease;
	}

	.ring-outer {
		width: 86px;
		height: 86px;
		border-color: rgba(69, 214, 239, 0.08);
	}

	.ring-mid {
		width: 78px;
		height: 78px;
		border-color: rgba(69, 214, 239, 0.12);
	}

	.ring-inner {
		width: 70px;
		height: 70px;
		border-color: rgba(69, 214, 239, 0.2);
	}

	/* Sweep effect */
	.sweep-line {
		position: absolute;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		border: 2px solid transparent;
		border-top-color: rgba(69, 214, 239, 0.5);
		animation: sweep-rotate 1.2s linear infinite;
	}

	@keyframes sweep-rotate {
		to { transform: rotate(360deg); }
	}

	/* Active state */
	.active .ring {
		opacity: 1;
	}

	.active .ring-outer {
		animation: ring-breathe 2s ease-in-out infinite;
	}

	.active .ring-mid {
		animation: ring-breathe 2s ease-in-out 0.3s infinite;
	}

	.active .ring-inner {
		animation: ring-breathe 2s ease-in-out 0.6s infinite;
	}

	/* Complete state */
	.complete .ring {
		opacity: 1;
		animation: none;
		transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.complete .ring-outer {
		border-color: rgba(52, 211, 153, 0.2);
		box-shadow: 0 0 20px rgba(52, 211, 153, 0.08);
	}

	.complete .ring-mid {
		border-color: rgba(52, 211, 153, 0.35);
	}

	.complete .ring-inner {
		border-color: rgba(52, 211, 153, 0.5);
		box-shadow: 0 0 16px rgba(52, 211, 153, 0.15);
	}

	@keyframes ring-breathe {
		0%, 100% {
			transform: scale(1);
			opacity: 0.5;
		}
		50% {
			transform: scale(1.06);
			opacity: 1;
		}
	}
</style>
