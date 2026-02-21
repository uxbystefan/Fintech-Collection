<script lang="ts">
	import { Download, Columns } from 'lucide-svelte';

	const transactions = [
		{
			id: 'TX-99281',
			company: 'Acme Corp',
			companyInitial: 'AC',
			companyColor: '#3b82f6',
			dateTime: '10:42:01 AM',
			amount: '$69,900.00',
			method: 'SWIFT',
			region: 'EU-West',
			riskScore: 13,
			riskLevel: 'low'
		},
		{
			id: 'TX-99282',
			company: 'Globex Corp',
			companyInitial: 'G',
			companyColor: '#8b5cf6',
			dateTime: '10:41:55 AM',
			amount: '$12,500.00',
			method: 'SEPA',
			region: 'US-East',
			riskScore: 78,
			riskLevel: 'high'
		},
		{
			id: 'TX-99283',
			company: 'Soylent Corp',
			companyInitial: 'SC',
			companyColor: '#06b6d4',
			dateTime: '10:41:42 AM',
			amount: '$2,300.00',
			method: 'ACH',
			region: 'EU-West',
			riskScore: 83,
			riskLevel: 'high'
		},
		{
			id: 'TX-99284',
			company: 'Umbrella Corp',
			companyInitial: 'U',
			companyColor: '#ec4899',
			dateTime: '10:40:30 AM',
			amount: '$150,000.00',
			method: 'WIRE',
			region: 'EU-Central',
			riskScore: 91,
			riskLevel: 'critical'
		},
		{
			id: 'TX-99285',
			company: 'Cyberdyne',
			companyInitial: 'C',
			companyColor: '#10b981',
			dateTime: '10:39:22 AM',
			amount: '$8,900.00',
			method: 'SWIFT',
			region: 'APAC-1',
			riskScore: 41,
			riskLevel: 'medium'
		},
		{
			id: 'TX-99286',
			company: 'Massive Dynamic',
			companyInitial: 'MD',
			companyColor: '#f97316',
			dateTime: '10:38:18 AM',
			amount: '$67,200.00',
			method: 'SEPA',
			region: 'EU-West',
			riskScore: 1,
			riskLevel: 'low'
		},
		{
			id: 'TX-99287',
			company: 'Hooli',
			companyInitial: 'HO',
			companyColor: '#ef4444',
			dateTime: '10:37:05 AM',
			amount: '$550.00',
			method: 'ACH',
			region: 'US-East',
			riskScore: 6,
			riskLevel: 'low'
		},
		{
			id: 'TX-99288',
			company: 'Initech',
			companyInitial: 'IN',
			companyColor: '#eab308',
			dateTime: '10:36:44 AM',
			amount: '$3,450.00',
			method: 'WIRE',
			region: 'US-Central',
			riskScore: 92,
			riskLevel: 'critical'
		},
		{
			id: 'TX-99289',
			company: 'Binford Corp',
			companyInitial: 'BC',
			companyColor: '#14b8a6',
			dateTime: '10:35:12 AM',
			amount: '$11,200.00',
			method: 'SWIFT',
			region: 'EU-East',
			riskScore: 8,
			riskLevel: 'low'
		}
	];

	function getRiskBarColor(level: string) {
		switch (level) {
			case 'low': return '#22c55e';
			case 'medium': return '#f59e0b';
			case 'high': return '#ef4444';
			case 'critical': return '#dc2626';
			default: return '#6b7280';
		}
	}
</script>

<div class="transactions-container">
	<div class="header">
		<div class="title-section">
			<div class="pulse-indicator"></div>
			<h2>Live Transactions</h2>
		</div>
		<div class="actions">
			<button class="action-btn">
				<Download size={16} />
				Export
			</button>
			<button class="action-btn">
				<Columns size={16} />
				Columns
			</button>
		</div>
	</div>

	<div class="table-wrapper">
		<table class="transactions-table">
			<thead>
				<tr>
					<th>TRANSACTION ID</th>
					<th>COMPANY</th>
					<th>DATE/TIME</th>
					<th>AMOUNT</th>
					<th>METHOD</th>
					<th>REGION</th>
					<th>RISK SCORE</th>
				</tr>
			</thead>
			<tbody>
				{#each transactions as tx}
					<tr>
						<td class="tx-id">{tx.id}</td>
						<td class="company">
							<div class="company-info">
								<div class="company-logo" style="background-color: {tx.companyColor}">
									{tx.companyInitial}
								</div>
								<span>{tx.company}</span>
							</div>
						</td>
						<td class="date-time">{tx.dateTime}</td>
						<td class="amount">{tx.amount}</td>
						<td class="method">{tx.method}</td>
						<td class="region">{tx.region}</td>
						<td class="risk-score">
							<div class="risk-bar-container">
								<div 
									class="risk-bar" 
									style="width: {tx.riskScore}%; background-color: {getRiskBarColor(tx.riskLevel)}"
								></div>
								<span class="risk-value">{tx.riskScore}</span>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="footer">
		<div class="pagination-info">
			Showing 9 of 1,250 transactions
		</div>
		<div class="pagination-controls">
			<button class="page-btn" disabled>&lt;</button>
			<button class="page-btn active">1</button>
			<button class="page-btn">2</button>
			<button class="page-btn">&gt;</button>
		</div>
	</div>
</div>

<style>
	.transactions-container {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.header {
		padding: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--color-border);
	}

	.title-section {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.pulse-indicator {
		width: 8px;
		height: 8px;
		background-color: #22c55e;
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
			transform: scale(1);
		}
		50% {
			opacity: 0.5;
			transform: scale(1.1);
		}
	}

	h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
	}

	.action-btn {
		padding: 0.5rem 1rem;
		background-color: transparent;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: all 0.2s;
	}

	.action-btn:hover {
		background-color: var(--color-bg-tertiary);
		color: var(--color-text-primary);
	}

	.table-wrapper {
		overflow-x: auto;
		flex: 1;
	}

	.transactions-table {
		width: 100%;
		border-collapse: collapse;
	}

	thead {
		background-color: var(--color-bg-primary);
	}

	th {
		text-align: left;
		padding: 1rem 1.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.5px;
		border-bottom: 1px solid var(--color-border);
	}

	tbody tr {
		border-bottom: 1px solid var(--color-border);
		transition: background-color 0.2s;
	}

	tbody tr:hover {
		background-color: var(--color-bg-tertiary);
	}

	td {
		padding: 1rem 1.5rem;
		font-size: 0.875rem;
		color: var(--color-text-primary);
	}

	.tx-id {
		color: var(--color-text-secondary);
		font-family: 'Courier New', monospace;
	}

	.company-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.company-logo {
		width: 32px;
		height: 32px;
		border-radius: 0.375rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		font-size: 0.75rem;
		color: white;
	}

	.date-time {
		color: var(--color-text-secondary);
	}

	.amount {
		font-weight: 600;
	}

	.method {
		color: var(--color-text-secondary);
		font-family: 'Courier New', monospace;
	}

	.region {
		color: var(--color-text-secondary);
	}

	.risk-bar-container {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.risk-bar {
		height: 6px;
		border-radius: 3px;
		transition: width 0.3s;
		min-width: 20px;
	}

	.risk-value {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		min-width: 20px;
	}

	.footer {
		padding: 1rem 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid var(--color-border);
	}

	.pagination-info {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
	}

	.pagination-controls {
		display: flex;
		gap: 0.5rem;
	}

	.page-btn {
		width: 32px;
		height: 32px;
		border: 1px solid var(--color-border);
		background-color: transparent;
		color: var(--color-text-secondary);
		border-radius: 0.375rem;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 0.875rem;
	}

	.page-btn:hover:not(:disabled) {
		background-color: var(--color-bg-tertiary);
		color: var(--color-text-primary);
	}

	.page-btn.active {
		background-color: var(--color-accent);
		color: white;
		border-color: var(--color-accent);
	}

	.page-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
