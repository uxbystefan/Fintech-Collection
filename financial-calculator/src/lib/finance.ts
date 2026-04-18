export interface Allocation {
	stocks: number;
	crypto: number;
	realEstate: number;
	cash: number;
}

export interface GrowthPoint {
	year: number;
	value: number;
}

const RETURNS: Record<keyof Allocation, number> = {
	stocks: 0.07,
	crypto: 0.12,
	realEstate: 0.06,
	cash: 0.02
};

export function getWeightedReturn(allocation: Allocation): number {
	const total = allocation.stocks + allocation.crypto + allocation.realEstate + allocation.cash;
	if (total === 0) return 0;
	return (
		(allocation.stocks / 100) * RETURNS.stocks +
		(allocation.crypto / 100) * RETURNS.crypto +
		(allocation.realEstate / 100) * RETURNS.realEstate +
		(allocation.cash / 100) * RETURNS.cash
	);
}

export function calculateGrowth(
	startingSavings: number,
	monthlyContribution: number,
	allocation: Allocation,
	years: number = 40
): GrowthPoint[] {
	const annualReturn = getWeightedReturn(allocation);
	const monthlyReturn = annualReturn / 12;
	const points: GrowthPoint[] = [];
	let value = startingSavings;

	for (let year = 0; year <= years; year++) {
		points.push({ year, value: Math.round(value) });
		for (let month = 0; month < 12; month++) {
			value = value * (1 + monthlyReturn) + monthlyContribution;
		}
	}

	return points;
}

export function yearsToFinancialFreedom(
	startingSavings: number,
	monthlyIncome: number,
	monthlyContribution: number,
	allocation: Allocation
): number {
	const annualExpenses = (monthlyIncome - monthlyContribution) * 12;
	const target = annualExpenses * 25; // 4% rule
	const annualReturn = getWeightedReturn(allocation);
	const monthlyReturn = annualReturn / 12;

	if (target <= startingSavings) return 0;
	if (monthlyReturn <= 0 && monthlyContribution <= 0) return Infinity;

	let value = startingSavings;
	let months = 0;
	const maxMonths = 12 * 60; // 60 years cap

	while (value < target && months < maxMonths) {
		value = value * (1 + monthlyReturn) + monthlyContribution;
		months++;
	}

	return months >= maxMonths ? 99 : Math.round((months / 12) * 10) / 10;
}

export function getStrategyLabel(allocation: Allocation): { label: string; type: 'balanced' | 'aggressive' | 'conservative' } {
	const riskScore = (allocation.stocks * 0.6 + allocation.crypto * 1.0 + allocation.realEstate * 0.3 + allocation.cash * 0) / 100;

	if (riskScore >= 0.65) return { label: 'High risk, high reward', type: 'aggressive' };
	if (riskScore >= 0.35) return { label: 'Balanced strategy', type: 'balanced' };
	return { label: 'Too conservative for your income', type: 'conservative' };
}

export function getValueAtAge(
	currentAge: number,
	targetAge: number,
	startingSavings: number,
	monthlyContribution: number,
	allocation: Allocation
): number {
	const years = targetAge - currentAge;
	if (years <= 0) return startingSavings;
	const growth = calculateGrowth(startingSavings, monthlyContribution, allocation, years);
	return growth[growth.length - 1]?.value ?? 0;
}

export function formatCurrency(value: number): string {
	if (value >= 1_000_000) {
		return '$' + (value / 1_000_000).toFixed(1) + 'M';
	}
	if (value >= 1_000) {
		return '$' + (value / 1_000).toFixed(0) + 'K';
	}
	return '$' + value.toFixed(0);
}

export function formatCurrencyFull(value: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0
	}).format(value);
}
