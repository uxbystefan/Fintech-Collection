<script lang="ts">
	const cryptoData = [
		{ name: 'BTC', change: 5.2, intensity: 0.8 },
		{ name: 'ETH', change: 3.8, intensity: 0.6 },
		{ name: 'SOL', change: 12.4, intensity: 1.0 },
		{ name: 'ADA', change: -2.1, intensity: 0.3 },
		{ name: 'DOT', change: 1.8, intensity: 0.4 },
		{ name: 'AVAX', change: 7.6, intensity: 0.7 }
	];
</script>

<div class="grid grid-cols-3 gap-2">
	{#each cryptoData as crypto}
		<div
			class="crypto-cell"
			style="background-color: {crypto.change > 0
				? `rgba(0, 255, 163, ${crypto.intensity * 0.15})`
				: `rgba(255, 68, 68, ${crypto.intensity * 0.15})`}; border-color: {crypto.change > 0
				? `rgba(0, 255, 163, ${crypto.intensity * 0.3})`
				: `rgba(255, 68, 68, ${crypto.intensity * 0.3})`};"
		>
			<div class="text-xs font-semibold text-text-primary">{crypto.name}</div>
			<div
				class="text-xs font-medium mt-1"
				class:text-neon={crypto.change > 0}
				class:text-red-400={crypto.change < 0}
			>
				{crypto.change > 0 ? '+' : ''}{crypto.change}%
			</div>
		</div>
	{/each}
</div>

<style>
	.crypto-cell {
		padding: 12px;
		border-radius: 8px;
		border: 1px solid;
		transition: all 250ms ease;
	}

	.crypto-cell:hover {
		transform: scale(1.05);
	}
</style>
