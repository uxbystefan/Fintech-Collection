<script lang="ts">
	import { onMount } from 'svelte';

	let input = '';
	let showSuggestions = false;
	let mounted = false;
	let processing = false;

	const suggestions = [
		{ command: 'simulate recession', description: 'Run recession impact analysis' },
		{ command: 'forecast revenue growth', description: 'Generate revenue projections' },
		{ command: 'analyze portfolio risk', description: 'Assess current portfolio exposure' },
		{ command: 'market correlation', description: 'Show asset correlation matrix' },
		{ command: 'optimize allocation', description: 'Suggest portfolio rebalancing' }
	];

	let filteredSuggestions: typeof suggestions = [];

	onMount(() => {
		setTimeout(() => {
			mounted = true;
		}, 1600);
	});

	function handleInput() {
		if (input.length > 0) {
			filteredSuggestions = suggestions.filter(
				(s) =>
					s.command.toLowerCase().includes(input.toLowerCase()) ||
					s.description.toLowerCase().includes(input.toLowerCase())
			);
			showSuggestions = filteredSuggestions.length > 0;
		} else {
			showSuggestions = false;
		}
	}

	function selectSuggestion(command: string) {
		input = command;
		showSuggestions = false;
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (!input.trim()) return;

		processing = true;
		showSuggestions = false;

		// Simulate processing
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Dispatch custom event for parent to handle
		const event = new CustomEvent('command', { detail: { command: input } });
		window.dispatchEvent(event);

		processing = false;
		input = '';
	}
</script>

<div class="command-console" class:mounted role="search">
	<form on:submit={handleSubmit} class="relative">
		<div class="console-input-wrapper">
			<svg
				class="icon"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
				/>
			</svg>

			<input
				type="text"
				bind:value={input}
				on:input={handleInput}
				on:focus={() => input.length > 0 && handleInput()}
				placeholder="Ask your financial interface anything..."
				class="console-input"
				disabled={processing}
				aria-label="AI Command Console"
				aria-autocomplete="list"
				aria-controls="suggestions-list"
				aria-expanded={showSuggestions}
			/>

			{#if processing}
				<div class="processing-indicator" aria-live="polite" aria-label="Processing command">
					<span class="dot" />
					<span class="dot" />
					<span class="dot" />
				</div>
			{/if}
		</div>

		{#if showSuggestions}
			<div class="suggestions" id="suggestions-list" role="listbox">
				{#each filteredSuggestions as suggestion}
					<button
						type="button"
						class="suggestion-item"
						on:click={() => selectSuggestion(suggestion.command)}
						role="option"
					>
						<div class="suggestion-command">{suggestion.command}</div>
						<div class="suggestion-description">{suggestion.description}</div>
					</button>
				{/each}
			</div>
		{/if}
	</form>
</div>

<style>
	.command-console {
		width: 100%;
		max-width: 800px;
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 400ms ease-out,
			transform 400ms ease-out;
	}

	.command-console.mounted {
		opacity: 1;
		transform: translateY(0);
	}

	.console-input-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		background: #11161d;
		border: 2px solid #1f2630;
		border-radius: 16px;
		padding: 0 24px;
		transition:
			border-color 150ms ease,
			box-shadow 150ms ease;
	}

	.console-input-wrapper:focus-within {
		border-color: rgba(0, 255, 163, 0.5);
		box-shadow: 0 0 30px rgba(0, 255, 163, 0.15);
	}

	.icon {
		width: 24px;
		height: 24px;
		color: #00ffa3;
		flex-shrink: 0;
	}

	.console-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		color: #e6edf3;
		font-size: 18px;
		padding: 20px 16px;
		font-family: 'Inter', sans-serif;
	}

	.console-input::placeholder {
		color: #7f8a96;
	}

	.console-input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.processing-indicator {
		display: flex;
		gap: 6px;
	}

	.dot {
		width: 6px;
		height: 6px;
		background: #00ffa3;
		border-radius: 50%;
		animation: pulse 1.4s ease-in-out infinite;
	}

	.dot:nth-child(2) {
		animation-delay: 0.2s;
	}

	.dot:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes pulse {
		0%,
		80%,
		100% {
			opacity: 0.3;
			transform: scale(0.8);
		}
		40% {
			opacity: 1;
			transform: scale(1);
		}
	}

	.suggestions {
		position: absolute;
		top: calc(100% + 12px);
		left: 0;
		right: 0;
		background: #11161d;
		border: 1px solid #1f2630;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
		z-index: 50;
		animation: slide-in 150ms ease-out;
	}

	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.suggestion-item {
		width: 100%;
		text-align: left;
		padding: 16px 20px;
		border: none;
		background: transparent;
		cursor: pointer;
		transition:
			background-color 150ms ease,
			border-color 150ms ease;
		border-bottom: 1px solid #1f2630;
	}

	.suggestion-item:last-child {
		border-bottom: none;
	}

	.suggestion-item:hover,
	.suggestion-item:focus {
		background: rgba(0, 255, 163, 0.05);
		outline: none;
	}

	.suggestion-item:focus {
		box-shadow: inset 0 0 0 2px rgba(0, 255, 163, 0.3);
	}

	.suggestion-command {
		color: #e6edf3;
		font-weight: 600;
		font-size: 15px;
		margin-bottom: 4px;
	}

	.suggestion-description {
		color: #9aa6b2;
		font-size: 13px;
	}
</style>
