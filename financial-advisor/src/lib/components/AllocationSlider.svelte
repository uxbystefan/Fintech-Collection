<script lang="ts">
	let {
		label,
		value = $bindable(),
		color = '#FF7A00',
		max = 100,
		min = 0,
		step = 1
	}: {
		label: string;
		value: number;
		color?: string;
		max?: number;
		min?: number;
		step?: number;
	} = $props();

	let isDragging = $state(false);
	let sliderTrack: HTMLElement;

	function handlePointerDown(e: PointerEvent) {
		isDragging = true;
		(e.target as HTMLElement).setPointerCapture(e.pointerId);
		updateValue(e);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isDragging) return;
		updateValue(e);
	}

	function handlePointerUp() {
		isDragging = false;
	}

	function updateValue(e: PointerEvent) {
		if (!sliderTrack) return;
		const rect = sliderTrack.getBoundingClientRect();
		const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
		const pct = x / rect.width;
		const raw = min + pct * (max - min);
		value = Math.round(raw / step) * step;
	}

	let percentage = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="slider-container" class:active={isDragging}>
	<div class="slider-header">
		<span class="slider-label">{label}</span>
		<span class="slider-value font-tabular" style="color: {color}">{value}%</span>
	</div>

	<div
		class="slider-track"
		bind:this={sliderTrack}
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
		role="slider"
		aria-valuenow={value}
		aria-valuemin={min}
		aria-valuemax={max}
		aria-label={label}
		tabindex="0"
	>
		<div class="slider-fill" style="width: {percentage}%; background: {color};">
			<div class="slider-glow" style="background: {color};"></div>
		</div>
		<div
			class="slider-thumb"
			style="left: {percentage}%; border-color: {color}; box-shadow: 0 0 12px {color}40;"
		>
			<div class="thumb-inner" style="background: {color};"></div>
		</div>
	</div>
</div>

<style>
	.slider-container {
		width: 100%;
		padding: 0.5rem 0;
	}

	.slider-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.625rem;
	}

	.slider-label {
		font-size: 0.875rem;
		font-weight: 500;
		color: #A0A0B2;
	}

	.slider-value {
		font-size: 0.875rem;
		font-weight: 700;
		letter-spacing: 0.02em;
	}

	.slider-track {
		position: relative;
		width: 100%;
		height: 6px;
		background: #1A1A26;
		border-radius: 3px;
		cursor: pointer;
		touch-action: none;
		padding: 12px 0;
		margin: -12px 0;
	}

	.slider-fill {
		position: absolute;
		top: 12px;
		left: 0;
		height: 6px;
		border-radius: 3px;
		transition: width 0.05s ease-out;
	}

	.slider-glow {
		position: absolute;
		inset: -4px 0;
		border-radius: 5px;
		filter: blur(8px);
		opacity: 0.3;
	}

	.slider-thumb {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		border-radius: 50%;
		border: 2px solid;
		background: #12121A;
		transition: transform 0.15s ease, box-shadow 0.15s ease;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.active .slider-thumb {
		transform: translate(-50%, -50%) scale(1.15);
	}

	.thumb-inner {
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}
</style>
