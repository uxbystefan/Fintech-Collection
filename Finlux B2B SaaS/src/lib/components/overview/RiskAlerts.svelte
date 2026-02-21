<script lang="ts">
	import { AlertTriangle, MapPin, Shield } from 'lucide-svelte';

	const alerts = [
		{
			id: 1,
			title: 'High Velocity Attempt',
			description: '18 attempts detected from IP 199.186.* in under 2 mins.',
			priority: 'High',
			action: 'Block IP',
			icon: AlertTriangle,
			color: '#ef4444'
		},
		{
			id: 2,
			title: 'Unusual Location Access',
			description: 'Account #77782 accessed from Lagos, NG. New York, NY expected.',
			priority: 'Challenge',
			action: 'Require 2FA',
			icon: MapPin,
			color: '#f59e0b'
		},
		{
			id: 3,
			title: 'Verification Pending',
			description: 'Corporate entry *Atlas Holding* is past 30-day ID check.',
			priority: 'Info',
			action: 'Review Docs',
			icon: Shield,
			color: '#3b82f6'
		}
	];
</script>

<div class="alerts-card">
	<div class="alerts-header">
		<div>
			<h3 class="alerts-title">Risk Alerts</h3>
			<span class="alerts-badge">3 NEW</span>
		</div>
	</div>

	<div class="alerts-list">
		{#each alerts as alert}
			<div class="alert-item">
				<div class="alert-icon" style="background-color: {alert.color}20;">
					<svelte:component this={alert.icon} size={18} color={alert.color} />
				</div>
				<div class="alert-content">
					<h4 class="alert-title">{alert.title}</h4>
					<p class="alert-description">{alert.description}</p>
					<div class="alert-footer">
						<span class="alert-priority">{alert.priority}</span>
						<button class="alert-action">{alert.action}</button>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<a href="/risk-management" class="view-dashboard-link">
		View Security Dashboard
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
		</svg>
	</a>
</div>

<style>
	.alerts-card {
		background-color: var(--color-bg-secondary);
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.alerts-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.alerts-header > div {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.alerts-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.alerts-badge {
		background-color: var(--color-danger);
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 0.375rem;
		font-size: 0.625rem;
		font-weight: 700;
		letter-spacing: 0.05em;
	}

	.alerts-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.alert-item {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		background-color: var(--color-bg-tertiary);
		border-radius: 0.5rem;
		border: 1px solid var(--color-border);
	}

	.alert-icon {
		width: 40px;
		height: 40px;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.alert-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.alert-title {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.alert-description {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
		line-height: 1.5;
	}

	.alert-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.25rem;
	}

	.alert-priority {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--color-accent);
	}

	.alert-action {
		background: none;
		border: none;
		color: var(--color-accent);
		font-size: 0.75rem;
		font-weight: 600;
		padding: 0;
		text-decoration: underline;
	}

	.alert-action:hover {
		opacity: 0.8;
	}

	.view-dashboard-link {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.75rem;
		background-color: transparent;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		color: var(--color-text-primary);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s;
	}

	.view-dashboard-link:hover {
		background-color: var(--color-bg-tertiary);
		border-color: var(--color-accent);
		color: var(--color-accent);
	}
</style>
