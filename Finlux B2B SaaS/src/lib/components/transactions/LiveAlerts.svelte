<script lang="ts">
	import { AlertTriangle, Activity, MapPin, Server } from 'lucide-svelte';

	const systemHealthItems = [
		{ name: 'US East (N. Virginia)', status: 'Healthy', color: '#22c55e' },
		{ name: 'EU West (Ireland)', status: 'Healthy', color: '#22c55e' },
		{ name: 'APAC-1 (Tokyo)', status: 'Degraded', color: '#f59e0b' }
	];

	// Anomaly detection chart data (simple bars for visualization)
	const anomalyBars = [
		{ height: 30 },
		{ height: 45 },
		{ height: 35 },
		{ height: 50 },
		{ height: 40 },
		{ height: 65 },
		{ height: 85 },
		{ height: 70 }
	];
</script>

<div class="alerts-container">
	<div class="header">
		<h2>Live Alerts</h2>
		<span class="live-badge">LIVE</span>
	</div>

	<div class="alerts-list">
		<!-- High Value Flagged Alert -->
		<div class="alert-card critical">
			<div class="alert-header">
				<div class="alert-icon">
					<AlertTriangle size={16} />
				</div>
				<div class="alert-title-section">
					<span class="alert-title">High Value Flagged</span>
					<span class="alert-badge critical-badge">Critical</span>
				</div>
			</div>
			<div class="alert-content">
				<p>Transaction TX-99284 exceeds threshold (Unusual)</p>
				<div class="alert-amount">$550,000.00</div>
			</div>
		</div>

		<!-- Velocity Check Alert -->
		<div class="alert-card warning">
			<div class="alert-header">
				<div class="alert-icon">
					<Activity size={16} />
				</div>
				<div class="alert-title-section">
					<span class="alert-title">Velocity Check</span>
				</div>
			</div>
			<div class="alert-content">
				<p>Multiple small transactions from same IP</p>
				<div class="alert-detail">IP: 192.168.1.5</div>
			</div>
		</div>

		<!-- New Europe Login Alert -->
		<div class="alert-card info">
			<div class="alert-header">
				<div class="alert-icon">
					<MapPin size={16} />
				</div>
				<div class="alert-title-section">
					<span class="alert-title">New Europe Login</span>
				</div>
			</div>
			<div class="alert-content">
				<p>New login detected from unfamiliar location</p>
				<div class="alert-detail">Paris, France - 10 min ago</div>
			</div>
		</div>

		<!-- System Health Alert -->
		<div class="alert-card system">
			<div class="alert-header">
				<div class="alert-icon">
					<Server size={16} />
				</div>
				<div class="alert-title-section">
					<span class="alert-title">System Health</span>
				</div>
			</div>
			<div class="alert-content system-health">
				{#each systemHealthItems as item}
					<div class="health-item">
						<div class="health-info">
							<div class="health-indicator" style="background-color: {item.color}"></div>
							<span class="health-name">{item.name}</span>
						</div>
						<span class="health-status" style="color: {item.color}">{item.status}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Anomaly Detection Alert -->
		<div class="alert-card anomaly">
			<div class="alert-header">
				<div class="alert-icon">
					<AlertTriangle size={16} />
				</div>
				<div class="alert-title-section">
					<span class="alert-title">Anomaly Detection</span>
				</div>
			</div>
			<div class="alert-content">
				<div class="anomaly-chart">
					{#each anomalyBars as bar}
						<div class="chart-bar" style="height: {bar.height}%"></div>
					{/each}
				</div>
				<div class="anomaly-details">
					<p class="anomaly-text">
						<span class="anomaly-bullet"></span>
						Unusual spike in SWIFT transfers
					</p>
					<p class="anomaly-text">
						<span class="anomaly-bullet"></span>
						New merchant category detected
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.alerts-container {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		height: fit-content;
	}

	.header {
		padding: 1.5rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid var(--color-border);
	}

	h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin: 0;
	}

	.live-badge {
		padding: 0.25rem 0.75rem;
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
		font-size: 0.75rem;
		font-weight: 700;
		border-radius: 0.375rem;
		letter-spacing: 0.5px;
	}

	.alerts-list {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.alert-card {
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.alert-card.critical {
		border-left: 3px solid #ef4444;
	}

	.alert-card.warning {
		border-left: 3px solid #f59e0b;
	}

	.alert-card.info {
		border-left: 3px solid #3b82f6;
	}

	.alert-card.system {
		border-left: 3px solid #8b5cf6;
	}

	.alert-card.anomaly {
		border-left: 3px solid #ec4899;
	}

	.alert-header {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
	}

	.alert-icon {
		width: 32px;
		height: 32px;
		background-color: var(--color-bg-tertiary);
		border-radius: 0.375rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--color-text-secondary);
		flex-shrink: 0;
	}

	.alert-title-section {
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.alert-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.alert-badge {
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.critical-badge {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.alert-content {
		padding-left: 2.5rem;
	}

	.alert-content p {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		margin: 0 0 0.5rem 0;
	}

	.alert-amount {
		font-size: 1.25rem;
		font-weight: 700;
		color: #ef4444;
	}

	.alert-detail {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		font-family: 'Courier New', monospace;
	}

	.system-health {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.health-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.health-info {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.health-indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}

	.health-name {
		font-size: 0.875rem;
		color: var(--color-text-primary);
	}

	.health-status {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.anomaly-chart {
		display: flex;
		align-items: flex-end;
		gap: 0.5rem;
		height: 80px;
		margin-bottom: 1rem;
	}

	.chart-bar {
		flex: 1;
		background: linear-gradient(to top, #8b5cf6, #a78bfa);
		border-radius: 0.25rem;
		min-height: 20px;
	}

	.anomaly-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.anomaly-text {
		font-size: 0.875rem;
		color: var(--color-text-secondary);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
	}

	.anomaly-bullet {
		width: 6px;
		height: 6px;
		background-color: #8b5cf6;
		border-radius: 50%;
		flex-shrink: 0;
	}
</style>
