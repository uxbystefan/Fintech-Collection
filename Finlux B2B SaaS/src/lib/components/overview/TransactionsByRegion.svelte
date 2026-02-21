<script lang="ts">
	const regions = [
		{ name: 'NORTH AMERICA', percentage: 45, color: '#3b82f6' },
		{ name: 'EUROPE', percentage: 28, color: '#3b82f6' },
		{ name: 'ASIA PACIFIC', percentage: 18, color: '#3b82f6' },
		{ name: 'LATAM', percentage: 6, color: '#3b82f6' },
		{ name: 'OTHERS', percentage: 3, color: '#3b82f6' }
	];
</script>

<div class="region-card">
	<div class="region-header">
		<h3 class="region-title">Transactions by Region</h3>
		<p class="region-subtitle">Monthly distribution</p>
	</div>

	<div class="region-list">
		{#each regions as region}
			<div class="region-item">
				<div class="region-info">
					<span class="region-name">{region.name}</span>
					<span class="region-percentage">{region.percentage}%</span>
				</div>
				<div class="progress-bar">
					<div 
						class="progress-fill" 
						style="width: {region.percentage}%; background-color: {region.color};"
					></div>
				</div>
			</div>
		{/each}
	</div>

	<button class="download-btn">Download Regional Report</button>
</div>

<style>
	.region-card {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.region-header {
		margin-bottom: 0.5rem;
	}

	.region-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 0.25rem;
	}

	.region-subtitle {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.region-list {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.region-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.region-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.region-name {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text-secondary);
		letter-spacing: 0.05em;
	}

	.region-percentage {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.progress-bar {
		height: 8px;
		background-color: var(--color-bg-tertiary);
		border-radius: 4px;
		overflow: hidden;
	}

	.progress-fill {
		height: 100%;
		border-radius: 4px;
		transition: width 0.3s ease;
	}

	.download-btn {
		width: 100%;
		padding: 0.75rem;
		background-color: transparent;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		color: var(--color-text-primary);
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	.download-btn:hover {
		background-color: var(--color-bg-tertiary);
		border-color: var(--color-accent);
	}
</style>
