<script lang="ts">
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import SearchInput from '$lib/components/SearchInput.svelte';
	import CountryListItem from '$lib/components/CountryListItem.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import StateDebugger from '$lib/components/StateDebugger.svelte';
	import { Lock } from 'lucide-svelte';
	
	// State management - 4 interactive states
	type ViewState = 'default' | 'search' | 'empty' | 'loading';
	let currentState = $state<ViewState>('default');
	
	// Navigation handlers
	function handleBack() {
		goto('/');
	}
	
	function handleClose() {
		goto('/');
	}
	
	// State debugger options
	const stateOptions = [
		{ value: 'default', label: 'Default' },
		{ value: 'search', label: 'Search Active' },
		{ value: 'empty', label: 'Empty State' },
		{ value: 'loading', label: 'Loading' }
	];
	
	// Search state
	let searchQuery = $state('');
	let selectedCountry = $state<string | null>('GB');
	
	// Countries data
	const allCountries = [
		{ name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
		{ name: 'United States', code: 'US', flag: '🇺🇸' },
		{ name: 'Canada', code: 'CA', flag: '🇨🇦' },
		{ name: 'Australia', code: 'AU', flag: '🇦🇺' },
		{ name: 'France', code: 'FR', flag: '🇫🇷' },
		{ name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
		{ name: 'Germany', code: 'DE', flag: '🇩🇪' },
		{ name: 'Japan', code: 'JP', flag: '🇯🇵' }
	];
	
	const commonSearches = ['United States', 'United Kingdom', 'Germany'];
	
	// Filtered countries based on search
	let filteredCountries = $derived(
		searchQuery
			? allCountries.filter(c => 
				c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				c.code.toLowerCase().includes(searchQuery.toLowerCase())
			)
			: allCountries
	);
	
	function handleStateChange(state: ViewState) {
		currentState = state;
		
		// Set appropriate search query based on state
		if (state === 'empty') {
			searchQuery = 'xyz';
		} else if (state === 'search') {
			searchQuery = 'Uni';
		} else {
			searchQuery = '';
		}
	}
	
	function handleSearchInput(value: string) {
		searchQuery = value;
	}
	
	function handleSearchClear() {
		searchQuery = '';
	}
	
	function handleCountrySelect(code: string) {
		selectedCountry = code;
	}
	
	function handleCommonSearchClick(search: string) {
		searchQuery = search;
	}
</script>

<!-- State Switcher for Testing -->
<StateDebugger {currentState} onStateChange={handleStateChange} states={stateOptions} />

<!-- Main Screen -->
<div class="screen">
	<!-- Header -->
	<Header title={currentState === 'search' ? 'Select Country' : 'Select Residence'} onBack={handleBack} onClose={handleClose} />
	
	<!-- Progress Section -->
	<ProgressBar 
		currentStep={2} 
		totalSteps={5} 
		progress={40}
	/>
	
	<!-- Content Area -->
	<div class="content">
		<!-- Title Section -->
		<div class="title-section">
			<h1 class="heading">
				{currentState === 'search' || currentState === 'empty' ? 'Country of Residence' : 'Select your country'}
			</h1>
			<p class="description">
				{#if currentState === 'empty'}
					We need this to comply with banking regulations.
				{:else if currentState === 'search'}
					Please select your primary country for regulatory compliance and identity verification.
				{:else}
					Please choose your country of residence to help us verify your identity and comply with local regulations.
				{/if}
			</p>
		</div>
		
		<!-- Search Input -->
		<SearchInput
			bind:value={searchQuery}
			placeholder="Search for a country..."
			onInput={handleSearchInput}
			onClear={handleSearchClear}
		/>
		
		<!-- Countries List or Empty State -->
		<div class="countries-container">
			{#if currentState === 'loading'}
				<!-- Loading State: Skeleton UI -->
				<div class="skeleton-list">
					{#each Array(5) as _, i}
						<div class="skeleton-item"></div>
					{/each}
				</div>
			{:else if currentState === 'empty' || (searchQuery && filteredCountries.length === 0)}
				<!-- Empty State -->
				<EmptyState
					{searchQuery}
					{commonSearches}
					onCommonSearchClick={handleCommonSearchClick}
					showSupportNote={true}
				/>
			{:else}
				<!-- Countries List -->
				<div class="countries-list">
					{#if searchQuery && currentState === 'search'}
						<div class="search-label">SEARCH RESULTS</div>
					{/if}
					
					{#each filteredCountries as country}
						<CountryListItem
							{country}
							selected={selectedCountry === country.code}
							onClick={() => handleCountrySelect(country.code)}
						/>
					{/each}
					
					{#if currentState === 'search' && filteredCountries.length > 2}
						<div class="showing-text">Showing results for "{searchQuery}"</div>
					{/if}
				</div>
			{/if}
		</div>
		
		<!-- Bottom Section -->
		<div class="bottom-section">
			<!-- Continue Button -->
			<button 
				class="btn btn-primary" 
				disabled={!selectedCountry || currentState === 'loading'}
			>
				Continue
			</button>
			
			<!-- Security Note -->
			<div class="security-note">
				<Lock size={14} />
				<span>Your data is encrypted and processed securely</span>
			</div>
		</div>
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
		gap: 0.875rem;
		overflow: hidden;
	}
	
	/* Title Section */
	.title-section {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
	}
	
	.heading {
		font-size: 1.25rem;
		font-weight: 600;
		color: var(--text-primary);
		margin: 0;
	}
	
	.description {
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--text-secondary);
		margin: 0;
	}
	
	/* Countries Container */
	.countries-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		min-height: 0;
	}
	
	.countries-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-bottom: 0.5rem;
	}
	
	.search-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		margin-bottom: 0.5rem;
	}
	
	.showing-text {
		text-align: center;
		font-size: 0.875rem;
		color: var(--text-muted);
		padding: 0.5rem;
		margin-top: 0.5rem;
	}
	
	/* Skeleton Loading */
	.skeleton-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	
	.skeleton-item {
		height: 60px;
		background: linear-gradient(
			90deg,
			var(--surface) 25%,
			var(--surface-elevated) 50%,
			var(--surface) 75%
		);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
		border-radius: var(--radius-button);
	}
	
	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}
	
	/* Primary Button */
	/* Bottom Section */
	.bottom-section {
		flex-shrink: 0;
		padding-top: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
	}
	
	.btn-primary {
		width: 100%;
	}
	
	/* Security Note */
	.security-note {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem;
		color: var(--text-muted);
		font-size: 0.8125rem;
	}
	
	.security-note :global(svg) {
		flex-shrink: 0;
	}
</style>
