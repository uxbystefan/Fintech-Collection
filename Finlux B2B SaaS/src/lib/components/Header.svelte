<script lang="ts">
	import { Search, Bell, MessageSquare } from 'lucide-svelte';
</script>

<header class="header">
	<div class="search-container">
		<Search size={18} class="search-icon" />
		<input 
			type="text" 
			placeholder="Search transactions, accounts, or analytics..." 
			class="search-input"
		/>
	</div>

	<div class="header-actions">
		<button class="icon-btn">
			<Bell size={20} />
		</button>
		<button class="icon-btn">
			<MessageSquare size={20} />
		</button>
		<div class="user-profile">
			<img src="/alex-thorne.jpg.jpg" alt="Alex Thorne" class="user-avatar" />
			<div class="user-info">
				<div class="user-name">Alex Thorne</div>
				<div class="user-role">Admin (8:51 PM)</div>
			</div>
		</div>
	</div>
</header>

<style>
	.header {
		height: 70px;
		background-color: var(--color-bg-secondary);
		border-bottom: 1px solid var(--color-border);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 2rem;
		gap: 2rem;
	}

	.search-container {
		flex: 1;
		max-width: 500px;
		position: relative;
	}

	.search-container :global(.search-icon) {
		position: absolute;
		left: 1rem;
		top: 50%;
		transform: translateY(-50%);
		color: var(--color-text-secondary);
	}

	.search-input {
		width: 100%;
		padding: 0.75rem 1rem 0.75rem 2.75rem;
		background-color: var(--color-bg-primary);
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		color: var(--color-text-primary);
		font-size: 0.875rem;
		outline: none;
		transition: border-color 0.2s;
	}

	.search-input::placeholder {
		color: var(--color-text-secondary);
	}

	.search-input:focus {
		border-color: var(--color-accent);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.icon-btn {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
		color: var(--color-text-secondary);
		transition: all 0.2s;
	}

	.icon-btn:hover {
		background-color: var(--color-bg-tertiary);
		color: var(--color-text-primary);
	}

	.user-profile {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding-left: 1rem;
		border-left: 1px solid var(--color-border);
	}

	.user-avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		object-fit: cover;
		border: 2px solid var(--color-border);
	}

	.user-info {
		display: flex;
		flex-direction: column;
	}

	.user-name {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--color-text-primary);
	}

	.user-role {
		font-size: 0.75rem;
		color: var(--color-text-secondary);
	}
</style>
