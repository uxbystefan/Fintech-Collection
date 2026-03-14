<script lang="ts">
	import { Chart, Svg, Area, Axis, Tooltip, LinearGradient } from 'layerchart';
	import { scaleTime, scaleLinear } from 'd3-scale';

	// Generate sample time series data
	const generateTimeSeriesData = () => {
		const data = [];
		const now = new Date();
		let value = 100000;

		for (let i = 30; i >= 0; i--) {
			const date = new Date(now);
			date.setDate(date.getDate() - i);

			value += (Math.random() - 0.45) * 5000;
			data.push({
				date,
				value: Math.max(value, 50000)
			});
		}

		return data;
	};

	export let data = generateTimeSeriesData();
	export let title = 'Portfolio Value';
