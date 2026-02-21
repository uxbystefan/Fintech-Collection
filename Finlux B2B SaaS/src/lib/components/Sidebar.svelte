<script lang="ts">
	import { page } from '$app/stores';
	import {
		LayoutDashboard,
		ArrowLeftRight,
		BarChart3,
		Users,
		ShieldAlert,
		Settings
	} from 'lucide-svelte';

	const navItems = [
		{ name: 'Overview', icon: LayoutDashboard, href: '/' },
		{ name: 'Transactions', icon: ArrowLeftRight, href: '/transactions' },
		{ name: 'Analytics', icon: BarChart3, href: '/analytics' },
		{ name: 'Customers', icon: Users, href: '/customers' },
		{ name: 'Risk Management', icon: ShieldAlert, href: '/risk-management' }
	];
</script>

<aside class="sidebar">
	<div class="logo">
		<div class="logo-icon">
			<svg width="28" height="28" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
				<!-- Top parallelogram bar -->
				<path d="M 135 150 L 395 150 L 365 205 L 105 205 Z" fill="#1E5FFF"/>
				<!-- Middle parallelogram bar with curve -->
				<path d="M 185 220 L 355 220 L 325 275 L 240 275 C 220 275 210 285 215 310 L 250 395 L 195 395 L 175 320 C 165 280 170 250 185 220 Z" fill="#1447CC"/>
			</svg>
		</div>
		<span class="logo-text">Finlux</span>
	</div>

	<nav class="nav">
		{#each navItems as item}
			{@const Icon = item.icon}
			<a 
				href={item.href} 
				class="nav-item"
				class:active={$page.url.pathname === item.href}
			>
				<Icon size={20} />
				<span>{item.name}</span>
			</a>
		{/each}
	</nav>

	<div class="sidebar-footer">
		<a href="/settings" class="nav-item" class:active={$page.url.pathname === '/settings'}>
			<Settings size={20} />
			<span>Settings</span>
		</a>
		<div class="plan-info">
			<div class="plan-badge">CURRENT PLAN</div>
			<div class="plan-name">Enterprise Pro</div>
			<button class="upgrade-btn">Upgrade</button>
		</div>
	</div>
</aside>

<style>
	.sidebar {
		width: 240px;
		background-color: var(--color-bg-secondary);
		border-right: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		padding: 1.5rem 0;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0 1.5rem;
		margin-bottom: 2rem;
	}

	.logo-icon {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo-text {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-text-primary);
	}

	.nav {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0 1rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		color: var(--color-text-secondary);
		text-decoration: none;
		border-radius: 0.5rem;
		transition: all 0.2s;
		font-size: 0.875rem;
	}

	.nav-item:hover {
		background-color: var(--color-bg-tertiary);
		color: var(--color-text-primary);
	}

	.nav-item.active {
		background-color: var(--color-accent);
		color: var(--color-text-primary);
	}

	.sidebar-footer {
		padding: 0 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.plan-info {
		background-color: var(--color-bg-tertiary);
		border-radius: 0.5rem;
		padding: 1rem;
		margin-top: 1rem;
	}

	.plan-badge {
		font-size: 0.625rem;
		font-weight: 600;
		color: var(--color-accent);
		letter-spacing: 0.05em;
		margin-bottom: 0.5rem;
	}

	.plan-name {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: 0.75rem;
	}

	.upgrade-btn {
		width: 100%;
		padding: 0.5rem;
		background-color: var(--color-accent);
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		font-weight: 500;
		transition: opacity 0.2s;
	}

	.upgrade-btn:hover {
		opacity: 0.9;
	}
</style>
