<script lang="ts">
	import { Button } from 'bits-ui';
	import { Fingerprint } from 'lucide-svelte';
	import ScanRing from './ScanRing.svelte';

	let {
		onReveal
	}: {
		onReveal: () => void;
	} = $props();

	let isPressed = $state(false);
	let isScanning = $state(false);
	let scanComplete = $state(false);
	let holdTimer: ReturnType<typeof setTimeout> | null = null;
	let scanDuration = 1500;

	function handlePointerDown() {
		isPressed = true;
		isScanning = true;

		holdTimer = setTimeout(() => {
			scanComplete = true;
			isScanning = false;

			setTimeout(() => {
				onReveal();
			}, 300);
		}, scanDuration);
	}

	function handlePointerUp() {
		if (!scanComplete) {
			isPressed = false;
			isScanning = false;
			if (holdTimer) {
				clearTimeout(holdTimer);
				holdTimer = null;
			}
		}
	}

	function handlePointerLeave() {
		handlePointerUp();
	}
</script>

<div class="biometric-area">
	<!-- Hero fingerprint circle -->
	<div class="fingerprint-hero" class:pressed={isPressed} class:complete={scanComplete}>
		<div class="fp-glow"></div>
		<ScanRing active={isScanning} complete={scanComplete} />
		<Button.Root
			class="fp-button {isPressed ? 'pressed' : ''} {scanComplete ? 'complete' : ''}"
			onpointerdown={handlePointerDown}
			onpointerup={handlePointerUp}
			onpointerleave={handlePointerLeave}
		>
			<Fingerprint size={36} strokeWidth={1.2} />
		</Button.Root>
	</div>

	<!-- Label below -->
	<div class="label-area">
		<span class="btn-label" class:scanning={isScanning} class:verified={scanComplete}>
			{#if scanComplete}
				Identity Verified
			{:else if isScanning}
				Scanning Biometrics…
			{:else}
				Hold to Authenticate
			{/if}
		</span>
		{#if !scanComplete}
			<p class="hint-text">Press & hold for biometric verification</p>
		{/if}
	</div>
</div>

<style>
	.biometric-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		padding-bottom: 4px;
	}

	/* --- Fingerprint Hero --- */
	.fingerprint-hero {
		position: relative;
		width: 88px;
		height: 88px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fp-glow {
		position: absolute;
		inset: -20px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(69, 214, 239, 0.06) 0%, transparent 70%);
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.fingerprint-hero.pressed .fp-glow {
		opacity: 1;
		animation: glow-breathe 1.5s ease-in-out infinite alternate;
	}

	.fingerprint-hero.complete .fp-glow {
		opacity: 1;
		background: radial-gradient(circle, rgba(52, 211, 153, 0.08) 0%, transparent 70%);
		animation: none;
	}

	@keyframes glow-breathe {
		from { transform: scale(1); opacity: 0.8; }
		to { transform: scale(1.15); opacity: 1; }
	}

	:global(.fp-button) {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1.5px solid rgba(69, 214, 239, 0.2);
		background: rgba(69, 214, 239, 0.03);
		color: rgba(69, 214, 239, 0.5);
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		outline: none;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		position: relative;
		z-index: 2;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	:global(.fp-button:hover) {
		border-color: rgba(69, 214, 239, 0.35);
		color: rgba(69, 214, 239, 0.7);
		box-shadow: 0 0 24px rgba(69, 214, 239, 0.08), 0 4px 20px rgba(0, 0, 0, 0.2);
	}

	:global(.fp-button.pressed) {
		border-color: rgba(69, 214, 239, 0.5);
		background: rgba(69, 214, 239, 0.06);
		color: #45D6EF;
		transform: scale(0.95);
		box-shadow:
			0 0 32px rgba(69, 214, 239, 0.15),
			inset 0 0 20px rgba(69, 214, 239, 0.04);
	}

	:global(.fp-button.complete) {
		border-color: rgba(52, 211, 153, 0.5);
		background: rgba(52, 211, 153, 0.06);
		color: #34D399;
		box-shadow: 0 0 32px rgba(52, 211, 153, 0.12);
		transform: scale(1);
	}

	/* --- Labels --- */
	.label-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.btn-label {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(69, 214, 239, 0.5);
		transition: color 0.3s ease;
	}

	.btn-label.scanning {
		color: #45D6EF;
		animation: label-pulse 1.2s ease-in-out infinite alternate;
	}

	.btn-label.verified {
		color: #34D399;
	}

	@keyframes label-pulse {
		from { opacity: 0.6; }
		to { opacity: 1; }
	}

	.hint-text {
		font-size: 10px;
		color: var(--text-muted, #555B68);
		letter-spacing: 0.02em;
		text-align: center;
		opacity: 0.7;
	}
</style>
