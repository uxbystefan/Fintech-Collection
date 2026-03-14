// Type definitions for components

export interface MetricData {
	value: number;
	change: number;
	prefix?: string;
	suffix?: string;
	label?: string;
}

export interface MarketSentiment {
	label: string;
	value: number;
	color: string;
}

export interface CryptoAsset {
	name: string;
	symbol: string;
	change: number;
	intensity: number;
	price?: number;
}

export interface CommandSuggestion {
	command: string;
	description: string;
	category?: string;
}

export interface DataPoint {
	x: number;
	y: number;
	delay: number;
	value?: number;
}

export interface PanelConfig {
	title: string;
	delay: number;
	parallaxIntensity?: number;
	position?: 'left' | 'right' | 'center';
}
