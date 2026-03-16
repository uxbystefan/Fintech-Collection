import { writable, derived } from 'svelte/store';
import type { FinancialInputs } from './types';
import { DEFAULT_INPUTS, computeMetrics, computeAllocation, computeProjection, generateInsights } from './finance';

export const financialInputs = writable<FinancialInputs>({ ...DEFAULT_INPUTS });

export const metrics = derived(financialInputs, ($inputs) => computeMetrics($inputs));
export const allocation = derived(financialInputs, ($inputs) => computeAllocation($inputs));
export const projection = derived(financialInputs, ($inputs) => computeProjection($inputs));
export const insights = derived(financialInputs, ($inputs) => generateInsights($inputs));
