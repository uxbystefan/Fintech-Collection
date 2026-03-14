<script lang="ts">
	const marketData = [
		{ label: 'Bullish', value: 68, color: '#00FFA3' },
		{ label: 'Neutral', value: 22, color: '#9AA6B2' },
		{ label: 'Bearish', value: 10, color: '#ff4444' }
	];
</script>

<div class="space-y-3">
	{#each marketData as item}
		<div>
			<div class="flex items-center justify-between mb-1">
				<span class="text-sm text-text-secondary">{item.label}</span>
				<span class="text-sm font-semibold text-text-primary">{item.value}%</span>
			</div>
			<div class="w-full bg-elevated rounded-full h-2 overflow-hidden">
				<div
					class="h-full rounded-full transition-all duration-1000"
					style="width: {item.value}%; background-color: {item.color};"
				/>
			</div>
		</div>
	{/each}
</div>
