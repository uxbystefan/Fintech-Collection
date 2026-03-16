<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();

	const navItems = [
		{ href: '/dashboard', label: 'Dashboard' },
		{ href: '/simulation', label: 'Simulation' },
		{ href: '/about', label: 'About' }
	];
</script>

<svelte:head>
	<title>AI Wealth Management</title>
</svelte:head>

<div class="app-shell">
	<header class="topnav">
		<div class="topnav-inner">
			<a href="/dashboard" class="brand" aria-label="AI Wealth Management home">
				<span class="brand-icon" aria-hidden="true">◈</span>
				<span class="brand-text">AI Wealth Management</span>
			</a>

			<nav class="nav" aria-label="Main navigation">
				{#each navItems as item}
					<a
						href={item.href}
						class="nav-link"
						class:nav-link--active={$page.url.pathname === item.href}
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>
	</header>

	<main class="main-content">
		{@render children()}
	</main>

	<footer class="footer">
		<div class="footer-inner">
			<span>AI Wealth Management · Simulation Tool</span>
			<span>All calculations are illustrative only and not financial advice.</span>
		</div>
	</footer>
</div>

<style>
	:global(body) {
		background: var(--color-bg);
	}

	.app-shell {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	/* ===== TOP NAV ===== */
	.topnav {
		background: var(--color-surface);
		border-bottom: 1px solid var(--color-border);
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: var(--shadow-sm);
	}

	.topnav-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding: 0 var(--space-8);
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-8);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		text-decoration: none;
		flex-shrink: 0;
	}

	.brand-icon {
		font-size: 1.25rem;
		color: var(--color-primary);
	}

	.brand-text {
		font-family: var(--font-serif);
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-primary);
		letter-spacing: -0.01em;
		white-space: nowrap;
	}

	.nav {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.nav-link {
		display: inline-flex;
		align-items: center;
		height: 36px;
		padding: 0 var(--space-4);
		border-radius: var(--radius-md);
		font-family: var(--font-sans);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		text-decoration: none;
		transition: background var(--transition), color var(--transition);
	}

	.nav-link:hover {
		background: var(--color-bg);
		color: var(--color-text-primary);
	}

	.nav-link--active {
		background: var(--color-primary-muted);
		color: var(--color-primary);
		font-weight: 600;
	}

	/* ===== MAIN ===== */
	.main-content {
		flex: 1;
		width: 100%;
		max-width: 1400px;
		margin: 0 auto;
		padding: var(--space-8);
	}

	/* ===== FOOTER ===== */
	.footer {
		border-top: 1px solid var(--color-border);
		background: var(--color-surface);
		margin-top: auto;
	}

	.footer-inner {
		max-width: 1400px;
		margin: 0 auto;
		padding: var(--space-4) var(--space-8);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.footer-inner span {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		color: var(--color-text-muted);
	}
</style>
