import type { FinancialInputs, FinancialMetrics, Insight, ProjectionPoint, WealthAllocation } from './types';

// ===== DEFAULT INPUTS =====
export const DEFAULT_INPUTS: FinancialInputs = {
	monthlyIncome: 8500,
	monthlyExpenses: 4200,
	savings: 24000,
	investments: 45000,
	debt: 18000,
	cash: 24000,
	stocks: 38000,
	crypto: 7000,
	realEstate: 0
};

// ===== CORE CALCULATIONS =====

export function computeMetrics(inputs: FinancialInputs): FinancialMetrics {
	const {
		monthlyIncome,
		monthlyExpenses,
		savings,
		investments,
		debt,
		cash,
		stocks,
		crypto,
		realEstate
	} = inputs;

	const totalAssets = cash + stocks + crypto + realEstate + savings + investments;
	const totalLiabilities = debt;
	const netWorth = totalAssets - totalLiabilities;

	const savingsRate =
		monthlyIncome > 0 ? Math.max(0, (monthlyIncome - monthlyExpenses) / monthlyIncome) : 0;

	const debtRatio = totalAssets > 0 ? debt / totalAssets : 0;

	const emergencyFundMonths =
		monthlyExpenses > 0 ? (cash + savings) / monthlyExpenses : 0;

	const investmentAllocation =
		totalAssets > 0 ? (stocks + crypto + realEstate + investments) / totalAssets : 0;

	const cashAllocation = totalAssets > 0 ? (cash + savings) / totalAssets : 0;

	// ===== HEALTH SCORE CALCULATION =====
	// Savings Rate: 30% weight. Target >= 20% = full score
	const savingsRateScore = Math.min(1, savingsRate / 0.2) * 30;

	// Debt Ratio: 30% weight. Target <= 20% = full score, >= 60% = 0
	const debtRatioScore = Math.max(0, 1 - (debtRatio - 0.2) / 0.4) * 30;
	const clampedDebtScore = Math.min(30, Math.max(0, debtRatio <= 0.2 ? 30 : debtRatioScore));

	// Emergency Fund: 20% weight. Target >= 6 months
	const emergencyFundScore = Math.min(1, emergencyFundMonths / 6) * 20;

	// Investment Allocation: 20% weight. Target >= 40%
	const investmentScore = Math.min(1, investmentAllocation / 0.4) * 20;

	const healthScore = Math.round(
		savingsRateScore + clampedDebtScore + emergencyFundScore + investmentScore
	);

	return {
		netWorth,
		totalAssets,
		totalLiabilities,
		savingsRate,
		debtRatio,
		emergencyFundMonths,
		investmentAllocation,
		cashAllocation,
		healthScore: Math.min(100, Math.max(0, healthScore)),
		healthScoreBreakdown: {
			savingsRateScore: Math.round(savingsRateScore),
			debtRatioScore: Math.round(clampedDebtScore),
			emergencyFundScore: Math.round(emergencyFundScore),
			investmentScore: Math.round(investmentScore)
		}
	};
}

// ===== WEALTH ALLOCATION =====

export function computeAllocation(inputs: FinancialInputs): WealthAllocation {
	const { cash, savings, stocks, crypto, realEstate, investments } = inputs;
	const totalCash = cash + savings;
	const totalStocks = stocks + investments;
	const total = totalCash + totalStocks + crypto + realEstate;

	if (total === 0) {
		return { cash: 0, stocks: 0, crypto: 0, realEstate: 0, other: 0 };
	}

	return {
		cash: (totalCash / total) * 100,
		stocks: (totalStocks / total) * 100,
		crypto: (crypto / total) * 100,
		realEstate: (realEstate / total) * 100,
		other: 0
	};
}

// ===== WEALTH PROJECTION =====

export function computeProjection(inputs: FinancialInputs): ProjectionPoint[] {
	const { monthlyIncome, monthlyExpenses } = inputs;
	const metrics = computeMetrics(inputs);
	const monthlySavings = Math.max(0, monthlyIncome - monthlyExpenses);
	const annualSavings = monthlySavings * 12;

	// Assume 6% annual return on invested portion
	const annualReturn = 0.06;
	const points: ProjectionPoint[] = [];
	let currentValue = metrics.netWorth;

	for (let year = 0; year <= 20; year++) {
		points.push({ year: new Date().getFullYear() + year, value: Math.round(currentValue) });
		currentValue = currentValue * (1 + annualReturn) + annualSavings;
	}

	return points;
}

// ===== AI INSIGHT ENGINE (RULE-BASED) =====

export function generateInsights(inputs: FinancialInputs): Insight[] {
	const metrics = computeMetrics(inputs);
	const allocation = computeAllocation(inputs);
	const insights: Insight[] = [];

	// Savings rate rules
	if (metrics.savingsRate < 0.1) {
		insights.push({
			id: 'low-savings',
			type: 'negative',
			title: 'Low Savings Rate',
			message:
				'Your savings rate is below recommended levels. Aim to save at least 10–20% of your monthly income to build long-term wealth.'
		});
	} else if (metrics.savingsRate >= 0.2) {
		insights.push({
			id: 'strong-savings',
			type: 'positive',
			title: 'Strong Savings Rate',
			message:
				'You maintain a healthy savings rate. Consistently saving above 20% significantly accelerates wealth accumulation.'
		});
	} else {
		insights.push({
			id: 'moderate-savings',
			type: 'neutral',
			title: 'Moderate Savings Rate',
			message:
				'Your savings rate is in an acceptable range. Consider increasing it gradually toward 20% for stronger financial resilience.'
		});
	}

	// Cash concentration rule
	if (allocation.cash > 50) {
		insights.push({
			id: 'high-cash',
			type: 'warning',
			title: 'Excess Cash Holdings',
			message:
				'You may be holding too much cash relative to investments. Idle cash loses value to inflation. Consider deploying excess capital into diversified assets.'
		});
	}

	// Debt ratio rules
	if (metrics.debtRatio > 0.4) {
		insights.push({
			id: 'high-debt',
			type: 'negative',
			title: 'Elevated Debt Ratio',
			message:
				'Your debt ratio is relatively high. A ratio above 40% can constrain financial flexibility. Prioritise debt reduction to improve your overall financial health score.'
		});
	} else if (metrics.debtRatio <= 0.1 && metrics.totalLiabilities > 0) {
		insights.push({
			id: 'low-debt',
			type: 'positive',
			title: 'Well-Managed Debt',
			message:
				'Your debt level is well under control. Low leverage provides financial stability and capacity for strategic investment.'
		});
	}

	// Investment allocation
	if (metrics.investmentAllocation >= 0.4) {
		insights.push({
			id: 'strong-investment',
			type: 'positive',
			title: 'Strong Investment Allocation',
			message:
				'You maintain a strong investment allocation. Having over 40% of assets in productive investments positions you well for long-term wealth growth.'
		});
	} else if (metrics.investmentAllocation < 0.2 && metrics.totalAssets > 0) {
		insights.push({
			id: 'low-investment',
			type: 'warning',
			title: 'Limited Investment Exposure',
			message:
				'Consider increasing long-term investments. A higher allocation to equities and diversified assets can improve your wealth projection significantly.'
		});
	}

	// Emergency fund
	if (metrics.emergencyFundMonths < 3) {
		insights.push({
			id: 'low-emergency',
			type: 'negative',
			title: 'Insufficient Emergency Fund',
			message:
				'Your liquid reserves cover fewer than 3 months of expenses. Build an emergency fund of 3–6 months to protect against unexpected financial shocks.'
		});
	} else if (metrics.emergencyFundMonths >= 6) {
		insights.push({
			id: 'good-emergency',
			type: 'positive',
			title: 'Solid Emergency Fund',
			message:
				'Your emergency fund covers 6+ months of expenses — a strong financial safety net that provides stability during adverse events.'
		});
	}

	// Return at most 5 insights, prioritising negatives and warnings
	const priority = ['negative', 'warning', 'neutral', 'positive'];
	insights.sort((a, b) => priority.indexOf(a.type) - priority.indexOf(b.type));

	return insights.slice(0, 5);
}

// ===== FORMAT HELPERS =====

export function formatCurrency(value: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0
	}).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
	return `${(value * 100).toFixed(decimals)}%`;
}
