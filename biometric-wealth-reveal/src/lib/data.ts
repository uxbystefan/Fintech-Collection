export interface Asset {
	label: string;
	ticker: string;
	value: number;
	allocation: number; // percentage
	change24h: number;  // percentage
	color: string;      // allocation bar color
}

export interface PortfolioData {
	totalValue: number;
	dayChange: number;
	dayChangePercent: number;
	assets: Asset[];
}

export const portfolioData: PortfolioData = {
	totalValue: 2_847_392.41,
	dayChange: 23_841.17,
	dayChangePercent: 0.84,
	assets: [
		{ label: 'US Equities', ticker: 'VTI', value: 1_138_956.96, allocation: 40.0, change24h: 1.12, color: '#45D6EF' },
		{ label: 'Int\'l Developed', ticker: 'VXUS', value: 569_478.48, allocation: 20.0, change24h: -0.34, color: '#7B8CDE' },
		{ label: 'Fixed Income', ticker: 'BND', value: 427_108.86, allocation: 15.0, change24h: 0.08, color: '#34D399' },
		{ label: 'Real Estate', ticker: 'VNQ', value: 284_739.24, allocation: 10.0, change24h: 0.67, color: '#FBBF24' },
		{ label: 'Digital Assets', ticker: 'BTC', value: 284_739.24, allocation: 10.0, change24h: 3.41, color: '#F97316' },
		{ label: 'Commodities', ticker: 'GLD', value: 142_369.63, allocation: 5.0, change24h: -0.19, color: '#A78BFA' }
	]
};
