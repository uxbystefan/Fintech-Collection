<script lang="ts">
	import { Shield } from 'lucide-svelte';
</script>

<div class="screen">
	<div class="content">
		<div class="hero">
			<div class="icon-container">
				<Shield size={48} strokeWidth={2} />
			</div>
			
			<h1>KYC/AML Verification</h1>
			<p>Select a screen to preview</p>
		</div>
		
		<div class="screen-links">
			<a href="/verification-intro" class="screen-card">
				<div class="screen-info">
					<h2>Screen 1</h2>
					<p>Identity Verification Intro</p>
				</div>
				<span class="arrow">→</span>
			</a>
			
			<a href="/country-selection" class="screen-card">
				<div class="screen-info">
					<h2>Screen 2</h2>
					<p>Country Selection</p>
				</div>
				<span class="arrow">→</span>
			</a>
		</div>
	</div>
</div>

<style>
	.screen {
		display: flex;
		flex-direction: column;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	
	.content {
		width: 100%;
		max-width: 400px;
		padding: var(--padding-screen);
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
	
	.hero {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	
	.icon-container {
		width: 80px;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0.05) 100%);
		border-radius: 50%;
		color: var(--primary);
	}
	
	h1 {
		font-size: 1.75rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}
	
	p {
		color: var(--text-secondary);
		margin: 0;
	}
	
	.screen-links {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	
	.screen-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.5rem;
		background: var(--surface);
		border: 1px solid var(--border-subtle);
		border-radius: var(--radius-card);
		cursor: pointer;
		transition: all 200ms ease-out;
		text-decoration: none;
	}
	
	.screen-card:hover {
		border-color: var(--primary);
		background: var(--surface-elevated);
		transform: translateX(4px);
	}
	
	.screen-info h2 {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0 0 0.25rem 0;
	}
	
	.screen-info p {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}
	
	.arrow {
		font-size: 1.5rem;
		color: var(--primary);
		transition: transform 200ms ease-out;
	}
	
	.screen-card:hover .arrow {
		transform: translateX(4px);
	}
</style>
