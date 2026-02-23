<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import VerificationCard from '$lib/components/VerificationCard.svelte';
	import StateDebugger from '$lib/components/StateDebugger.svelte';
	
	// State management - 4 interactive states
	type ViewState = 'default' | 'pressed' | 'loading' | 'accessibility';
	let currentState = $state<ViewState>('default');
	
	// Navigation handlers
	function handleBack() {
		goto('/');
	}
	
	function handleClose() {
		goto('/');
	}
	
	// Checklist items
	const checklistItems = [
		'Valid government-issued ID',
		'Live selfie verification',
		'Quick 2-minute process'
	];
	
	function handleStateChange(state: ViewState) {
		currentState = state;
	}
</script>

<!-- State Switcher for Testing -->
<StateDebugger {currentState} onStateChange={handleStateChange} />

<!-- Main Screen -->
<div class="screen" class:accessibility-mode={currentState === 'accessibility'}>
	<!-- Header -->
	<Header title="Identity Verification" onBack={handleBack} onClose={handleClose} />
	
	<!-- Progress Section -->
	<ProgressBar 
		currentStep={1} 
		totalSteps={5} 
		progress={20} 
		accessibilityMode={currentState === 'accessibility'}
	/>
	
	<!-- Content Area -->
	<div class="content">
		<!-- Card Container -->
		<VerificationCard 
			isLoading={currentState === 'loading'}
			accessibilityMode={currentState === 'accessibility'}
			{checklistItems}
		/>
		
		<!-- Primary Button -->
		<button 
			class="btn btn-primary" 
			class:btn-pressed={currentState === 'pressed'}
			disabled={currentState === 'loading'}
		>
			Start Verification
		</button>
		
		<!-- Secondary Action -->
		<button class="secondary-action">
			Why do I need this?
		</button>
	</div>
</div>

<style>
	/* Screen Layout */
	.screen {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding-top: 3rem; /* Space for state switcher */
	}
	
	/* Content Area */
	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 var(--padding-screen) var(--padding-screen);
		gap: var(--spacing-stack);
		overflow-y: auto;
	}
	
	/* Primary Button */
	.btn-primary {
		margin-top: auto;
	}
	
	.btn-pressed {
		background: var(--primary-pressed);
		transform: scale(0.98);
	}
	
	/* Secondary Action */
	.secondary-action {
		width: 100%;
		padding: 0.75rem;
		text-align: center;
		font-size: 0.9375rem;
		color: var(--text-secondary);
		background: transparent;
		border: none;
		transition: color 200ms ease-out;
		cursor: pointer;
	}
	
	.secondary-action:hover {
		color: var(--text-primary);
	}
	
	.accessibility-mode .secondary-action {
		font-size: 1rem;
	}
</style>
