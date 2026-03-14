<script lang="ts">
	export let value: number;
	export let change: number;
	export let prefix: string = '';
	export let suffix: string = '';
</script>

<div class="flex items-center justify-between">
	<div>
		<div class="text-2xl font-bold text-text-primary">
			{prefix}{value.toLocaleString()}{suffix}
		</div>
		<div
			class="text-sm font-medium mt-1"
			class:text-neon={change > 0}
			class:text-red-400={change < 0}
		>
			{change > 0 ? '+' : ''}{change}%
		</div>
	</div>
	<div class="w-16 h-16 flex items-center justify-center">
		<svg class="w-full h-full" viewBox="0 0 64 64">
			<path
				d="M 8 48 Q 16 32, 24 40 T 40 32 T 56 24"
				fill="none"
				stroke={change > 0 ? '#00FFA3' : '#ff4444'}
				stroke-width="2"
				class="trend-line"
			/>
		</svg>
	</div>
</div>

<style>
	.trend-line {
		stroke-dasharray: 100;
		stroke-dashoffset: 100;
		animation: draw-line 1s ease-out forwards;
	}

	@keyframes draw-line {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
