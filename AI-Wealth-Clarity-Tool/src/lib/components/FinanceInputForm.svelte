<script lang="ts">
	import { financialInputs } from '$lib/store';
	import type { FinancialInputs } from '$lib/types';
	import { get } from 'svelte/store';

	let localInputs: FinancialInputs = $state({ ...get(financialInputs) });

	function handleSubmit() {
		financialInputs.set({ ...localInputs });
	}

	function handleReset() {
		import('$lib/finance').then(({ DEFAULT_INPUTS }) => {
			localInputs = { ...DEFAULT_INPUTS };
			financialInputs.set({ ...localInputs });
		});
	}

	const incomeFields: Array<{ key: keyof FinancialInputs; label: string; hint: string }> = [
		{ key: 'monthlyIncome', label: 'Monthly Income', hint: 'Gross monthly income' },
		{ key: 'monthlyExpenses', label: 'Monthly Expenses', hint: 'Total monthly outgoings' }
	];

	const assetFields: Array<{ key: keyof FinancialInputs; label: string; hint: string }> = [
		{ key: 'cash', label: 'Cash Holdings', hint: 'Bank accounts, money market' },
		{ key: 'savings', label: 'Savings', hint: 'Dedicated savings accounts' },
		{ key: 'stocks', label: 'Stocks', hint: 'Equity positions' },
		{ key: 'investments', label: 'Investments', hint: 'Funds, ETFs, bonds' },
		{ key: 'crypto', label: 'Crypto', hint: 'Digital asset holdings' },
		{ key: 'realEstate', label: 'Real Estate', hint: 'Property market value' }
	];

	const liabilityFields: Array<{ key: keyof FinancialInputs; label: string; hint: string }> = [
		{ key: 'debt', label: 'Total Debt', hint: 'Loans, mortgages, credit' }
	];

	function formatValue(val: number): string {
		return val === 0 ? '' : String(val);
	}

	function parseValue(val: string): number {
		const n = parseFloat(val.replace(/[^0-9.-]/g, ''));
		return isNaN(n) ? 0 : n;
	}
</script>

<form class="form-card card" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
	<div class="form-header">
		<h2 class="form-title">Financial Profile</h2>
		<p class="form-subtitle">
			Enter your financial data below. All calculations run locally — no data is sent anywhere.
		</p>
	</div>

	<!-- Income & Expenses -->
	<fieldset class="field-group">
		<legend class="group-legend">Income & Expenses</legend>
		<div class="fields-grid">
			{#each incomeFields as field}
				<div class="field">
					<label for={field.key} class="field-label">{field.label}</label>
					<div class="input-wrap">
						<span class="input-prefix">$</span>
						<input
							id={field.key}
							type="number"
							class="input"
							min="0"
							step="100"
							placeholder="0"
							value={localInputs[field.key]}
							oninput={(e) => (localInputs[field.key] = parseValue((e.target as HTMLInputElement).value))}
						/>
					</div>
					<span class="field-hint">{field.hint}</span>
				</div>
			{/each}
		</div>
	</fieldset>

	<!-- Assets -->
	<fieldset class="field-group">
		<legend class="group-legend">Assets</legend>
		<div class="fields-grid">
			{#each assetFields as field}
				<div class="field">
					<label for={field.key} class="field-label">{field.label}</label>
					<div class="input-wrap">
						<span class="input-prefix">$</span>
						<input
							id={field.key}
							type="number"
							class="input"
							min="0"
							step="500"
							placeholder="0"
							value={localInputs[field.key]}
							oninput={(e) => (localInputs[field.key] = parseValue((e.target as HTMLInputElement).value))}
						/>
					</div>
					<span class="field-hint">{field.hint}</span>
				</div>
			{/each}
		</div>
	</fieldset>

	<!-- Liabilities -->
	<fieldset class="field-group">
		<legend class="group-legend">Liabilities</legend>
		<div class="fields-grid">
			{#each liabilityFields as field}
				<div class="field">
					<label for={field.key} class="field-label">{field.label}</label>
					<div class="input-wrap">
						<span class="input-prefix">$</span>
						<input
							id={field.key}
							type="number"
							class="input"
							min="0"
							step="500"
							placeholder="0"
							value={localInputs[field.key]}
							oninput={(e) => (localInputs[field.key] = parseValue((e.target as HTMLInputElement).value))}
						/>
					</div>
					<span class="field-hint">{field.hint}</span>
				</div>
			{/each}
		</div>
	</fieldset>

	<div class="actions">
		<button type="submit" class="btn btn--primary">Calculate</button>
		<button type="button" class="btn btn--ghost" onclick={handleReset}>Reset to defaults</button>
	</div>
</form>

<style>
	.form-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}

	.form-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.form-title {
		font-size: 1.25rem;
	}

	.form-subtitle {
		font-size: 0.875rem;
		color: var(--color-text-muted);
	}

	.field-group {
		border: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.group-legend {
		font-family: var(--font-sans);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--color-text-muted);
		padding-bottom: var(--space-3);
		border-bottom: 1px solid var(--color-border);
		display: block;
		width: 100%;
		margin-bottom: var(--space-2);
	}

	.fields-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: var(--space-5);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.field-label {
		font-family: var(--font-sans);
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--color-text-primary);
	}

	.input-wrap {
		display: flex;
		align-items: center;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-bg);
		transition: border-color var(--transition), box-shadow var(--transition);
		overflow: hidden;
	}

	.input-wrap:focus-within {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
	}

	.input-prefix {
		padding: 0 var(--space-3);
		font-family: var(--font-sans);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-muted);
		background: var(--color-surface);
		border-right: 1px solid var(--color-border);
		height: 40px;
		display: flex;
		align-items: center;
		user-select: none;
	}

	.input {
		flex: 1;
		border: none;
		outline: none;
		background: transparent;
		padding: 0 var(--space-3);
		font-family: var(--font-sans);
		font-size: 0.9375rem;
		font-weight: 500;
		color: var(--color-text-primary);
		height: 40px;
		font-variant-numeric: tabular-nums;
		min-width: 0;
	}

	.input::placeholder {
		color: var(--color-text-muted);
		font-weight: 400;
	}

	/* Hide arrow spinners */
	.input::-webkit-outer-spin-button,
	.input::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	.input[type=number] {
		-moz-appearance: textfield;
	}

	.field-hint {
		font-family: var(--font-sans);
		font-size: 0.6875rem;
		color: var(--color-text-muted);
	}

	.actions {
		display: flex;
		gap: var(--space-3);
		align-items: center;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		padding: 0 var(--space-6);
		border-radius: var(--radius-md);
		font-family: var(--font-sans);
		font-size: 0.875rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		cursor: pointer;
		border: none;
		transition: background var(--transition), color var(--transition), box-shadow var(--transition);
	}

	.btn--primary {
		background: var(--color-primary);
		color: #FFFFFF;
	}

	.btn--primary:hover {
		background: var(--color-primary-light);
	}

	.btn--ghost {
		background: transparent;
		color: var(--color-text-secondary);
		border: 1px solid var(--color-border);
	}

	.btn--ghost:hover {
		background: var(--color-bg);
		border-color: var(--color-border-hover);
	}
</style>
