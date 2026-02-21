<script lang="ts">
	import MetricsGrid from '$lib/components/overview/MetricsGrid.svelte';
	import RevenueChart from '$lib/components/overview/RevenueChart.svelte';
	import TransactionsByRegion from '$lib/components/overview/TransactionsByRegion.svelte';
	import RecentTransactions from '$lib/components/overview/RecentTransactions.svelte';
	import RiskAlerts from '$lib/components/overview/RiskAlerts.svelte';
</script>

<div class="overview-page">
	<MetricsGrid />
	
	<div class="content-grid">
		<div class="chart-section">
			<RevenueChart />
			<RecentTransactions />
		</div>
		
		<div class="sidebar-section">
			<TransactionsByRegion />
			<RiskAlerts />
		</div>
	</div>
</div>

<style>
	.overview-page {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: 1.5rem;
	}

	.chart-section,
	.sidebar-section {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	@media (max-width: 1400px) {
		.content-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
