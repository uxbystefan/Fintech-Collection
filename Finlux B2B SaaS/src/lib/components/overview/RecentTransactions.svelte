<script lang="ts">
	const transactions = [
		{
			id: '#TXN-8821',
			customer: 'Jordan Davis',
			date: 'Oct 23, 2023',
			amount: '$450.00',
			status: 'COMPLETED',
			avatar: 'JD'
		},
		{
			id: '#TXN-8819',
			customer: 'Sarah Miller',
			date: 'Oct 24, 2023',
			amount: '$1,280.00',
			status: 'PENDING',
			avatar: 'SM'
		},
		{
			id: '#TXN-8815',
			customer: 'Liam Wilson',
			date: 'Oct 23, 2023',
			amount: '$89.99',
			status: 'COMPLETED',
			avatar: 'LW'
		},
		{
			id: '#TXN-8812',
			customer: 'Emma Thompson',
			date: 'Oct 23, 2023',
			amount: '$2,540.00',
			status: 'DECLINED',
			avatar: 'ET'
		}
	];

	function getStatusClass(status: string) {
		switch (status) {
			case 'COMPLETED':
				return 'status-completed';
			case 'PENDING':
				return 'status-pending';
			case 'DECLINED':
				return 'status-declined';
			default:
				return '';
		}
	}
</script>

<div class="transactions-card">
	<div class="transactions-header">
		<h3 class="transactions-title">Recent Transactions</h3>
		<a href="/transactions" class="view-all-link">View All</a>
	</div>

	<div class="table-container">
		<table class="transactions-table">
			<thead>
				<tr>
					<th>TRANSACTION ID</th>
					<th>STATUS</th>
					<th>CUSTOMER</th>
					<th>DATE</th>
					<th>AMOUNT</th>
				</tr>
			</thead>
			<tbody>
				{#each transactions as transaction}
					<tr>
						<td class="transaction-id">{transaction.id}</td>
						<td>
							<span class="status-badge {getStatusClass(transaction.status)}">
								{transaction.status}
							</span>
						</td>
						<td>
							<div class="customer-cell">
								<div class="customer-avatar">{transaction.avatar}</div>
								<span>{transaction.customer}</span>
							</div>
						</td>
						<td class="date-cell">{transaction.date}</td>
						<td class="amount-cell">{transaction.amount}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.transactions-card {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		padding: 1.5rem;
	}

	.transactions-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.transactions-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.view-all-link {
		font-size: 0.875rem;
		color: var(--color-accent);
		text-decoration: none;
		font-weight: 500;
		transition: opacity 0.2s;
	}

	.view-all-link:hover {
		opacity: 0.8;
	}

	.table-container {
		overflow-x: auto;
	}

	.transactions-table {
		width: 100%;
		border-collapse: collapse;
	}

	.transactions-table thead th {
		text-align: left;
		padding: 0.75rem 1rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text-secondary);
		letter-spacing: 0.05em;
		border-bottom: 1px solid var(--color-border);
	}

	.transactions-table tbody tr {
		border-bottom: 1px solid var(--color-border);
		transition: background-color 0.2s;
	}

	.transactions-table tbody tr:hover {
		background-color: var(--color-bg-tertiary);
	}

	.transactions-table tbody td {
		padding: 1rem;
		font-size: 0.875rem;
	}

	.transaction-id {
		color: var(--color-text-primary);
		font-weight: 500;
	}

	.status-badge {
		display: inline-block;
		padding: 0.25rem 0.75rem;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.status-completed {
		background-color: rgba(16, 185, 129, 0.1);
		color: var(--color-success);
	}

	.status-pending {
		background-color: rgba(245, 158, 11, 0.1);
		color: var(--color-warning);
	}

	.status-declined {
		background-color: rgba(239, 68, 68, 0.1);
		color: var(--color-danger);
	}

	.customer-cell {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-text-primary);
	}

	.customer-avatar {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.date-cell {
		color: var(--color-text-secondary);
	}

	.amount-cell {
		color: var(--color-text-primary);
		font-weight: 600;
	}
</style>
