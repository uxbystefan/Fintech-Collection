// ===== FINANCIAL DATA TYPES =====

export interface FinancialInputs {
	monthlyIncome: number;
	monthlyExpenses: number;
	savings: number;
	investments: number;
	debt: number;
	cash: number;
	stocks: number;
	crypto: number;
	realEstate: number;
}

export interface FinancialMetrics {
	netWorth: number;
	totalAssets: number;
	totalLiabilities: number;
	savingsRate: number;
	debtRatio: number;
	emergencyFundMonths: number;
	investmentAllocation: number;
	cashAllocation: number;
	healthScore: number;
	healthScoreBreakdown: ScoreBreakdown;
}

export interface ScoreBreakdown {
	savingsRateScore: number;
	debtRatioScore: number;
	emergencyFundScore: number;
	investmentScore: number;
}

export interface WealthAllocation {
	cash: number;
	stocks: number;
	crypto: number;
	realEstate: number;
	other: number;
}

export interface Insight {
	id: string;
	type: 'positive' | 'negative' | 'neutral' | 'warning';
	title: string;
	message: string;
}

export interface ProjectionPoint {
	year: number;
	value: number;
}
