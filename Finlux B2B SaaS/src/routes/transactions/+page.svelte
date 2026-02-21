<script lang="ts">
	import TransactionMetrics from '$lib/components/transactions/TransactionMetrics.svelte';
	import LiveTransactionsTable from '$lib/components/transactions/LiveTransactionsTable.svelte';
	import LiveAlerts from '$lib/components/transactions/LiveAlerts.svelte';
</script>

<div class="transactions-page">
	<TransactionMetrics />
	
	<div class="content-grid">
		<div class="table-section">
			<LiveTransactionsTable />
		</div>
		<div class="alerts-section">
			<LiveAlerts />
		</div>
	</div>
</div>

<style>
	.transactions-page {
		padding: 2rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.content-grid {
		display: grid;
		grid-template-columns: 1fr 400px;
		gap: 1.5rem;
	}

	.table-section {
		min-width: 0;
	}

	.alerts-section {
		display: flex;
		flex-direction: column;
	}
</style>
