<script lang="ts">
	import { onMount } from 'svelte';
	import type { GrowthPoint } from '$lib/finance';

	let {
		data,
		regretData = null,
		showRegret = false
	}: {
		data: GrowthPoint[];
		regretData?: GrowthPoint[] | null;
		showRegret?: boolean;
	} = $props();

	let svgEl: HTMLSVGElement;
	let wrapperEl: HTMLElement;
	let mounted = $state(false);
	let width = $state(800);
	let height = $state(350);

	// Hover state
	let hoverYear = $state<number | null>(null);
	let hoverX = $state(0);
	let hoverY = $state(0);
	let hoverValue = $state(0);

	const padding = { top: 30, right: 30, bottom: 40, left: 60 };

	onMount(() => {
		mounted = true;
		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (entry) {
				width = entry.contentRect.width;
				height = Math.max(280, Math.min(400, entry.contentRect.height));
			}
		});
		if (svgEl?.parentElement) observer.observe(svgEl.parentElement);
		return () => observer.disconnect();
	});

	let chartWidth = $derived(width - padding.left - padding.right);
	let chartHeight = $derived(height - padding.top - padding.bottom);

	let maxValue = $derived(Math.max(...data.map(d => d.value), ...(regretData ?? []).map(d => d.value), 1));
	let maxYear = $derived(Math.max(...data.map(d => d.year), 1));

	function x(year: number): number {
		return padding.left + (year / maxYear) * chartWidth;
	}

	function y(val: number): number {
		return padding.top + chartHeight - (val / maxValue) * chartHeight;
	}

	function pathD(points: GrowthPoint[]): string {
		if (points.length === 0) return '';
		const segments = points.map((p, i) => {
			const px = x(p.year);
			const py = y(p.value);
			if (i === 0) return `M ${px} ${py}`;
			const prev = points[i - 1];
			const cpx1 = x(prev.year) + (px - x(prev.year)) * 0.4;
			const cpx2 = px - (px - x(prev.year)) * 0.4;
			return `C ${cpx1} ${y(prev.value)} ${cpx2} ${py} ${px} ${py}`;
		});
		return segments.join(' ');
	}

	function areaD(points: GrowthPoint[]): string {
		if (points.length === 0) return '';
		const line = pathD(points);
		const lastX = x(points[points.length - 1].year);
		const firstX = x(points[0].year);
		const baseY = padding.top + chartHeight;
		return `${line} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
	}

	let mainPath = $derived(pathD(data));
	let mainArea = $derived(areaD(data));
	let regretPath = $derived(regretData ? pathD(regretData) : '');
	let regretArea = $derived(regretData ? areaD(regretData) : '');

	let yTicks = $derived.by(() => {
		const count = 5;
		const step = maxValue / count;
		return Array.from({ length: count + 1 }, (_, i) => Math.round(i * step));
	});

	let xTicks = $derived.by(() => {
		const count = Math.min(8, maxYear);
		const step = Math.ceil(maxYear / count);
		return Array.from({ length: count + 1 }, (_, i) => i * step).filter(v => v <= maxYear);
	});

	function formatAxis(val: number): string {
		if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
		if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
		return `$${val}`;
	}

	function formatTooltip(val: number): string {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
	}

	function handleMouseMove(e: MouseEvent) {
		if (!svgEl || !wrapperEl) return;
		const rect = wrapperEl.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const svgX = (mouseX / rect.width) * width;
		const year = Math.round(((svgX - padding.left) / chartWidth) * maxYear);
		const clamped = Math.max(0, Math.min(maxYear, year));
		const point = data.find(d => d.year === clamped);
		if (point) {
			hoverYear = clamped;
			hoverX = x(clamped);
			hoverY = y(point.value);
			hoverValue = point.value;
		}
	}

	function handleMouseLeave() {
		hoverYear = null;
	}
</script>

<div class="chart-wrapper" bind:this={wrapperEl} onmousemove={handleMouseMove} onmouseleave={handleMouseLeave} role="img" aria-label="Wealth growth chart">
	<svg bind:this={svgEl} viewBox="0 0 {width} {height}" class="chart-svg">
		<defs>
			<linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#3A86FF" stop-opacity="0.2" />
				<stop offset="80%" stop-color="#3A86FF" stop-opacity="0.02" />
				<stop offset="100%" stop-color="#3A86FF" stop-opacity="0" />
			</linearGradient>
			<linearGradient id="regretGrad" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stop-color="#FF4D4D" stop-opacity="0.12" />
				<stop offset="100%" stop-color="#FF4D4D" stop-opacity="0" />
			</linearGradient>
			<filter id="lineGlow">
				<feGaussianBlur stdDeviation="4" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
			<filter id="dotGlow">
				<feGaussianBlur stdDeviation="3" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<!-- Grid lines -->
		{#each yTicks as tick}
			<line x1={padding.left} y1={y(tick)} x2={width - padding.right} y2={y(tick)} stroke="rgba(255,255,255,0.03)" stroke-width="1" />
			<text x={padding.left - 10} y={y(tick) + 4} text-anchor="end" fill="#7A7F8E" font-size="10" font-family="Inter" font-weight="500">{formatAxis(tick)}</text>
		{/each}

		{#each xTicks as tick}
			<line x1={x(tick)} y1={padding.top} x2={x(tick)} y2={padding.top + chartHeight} stroke="rgba(255,255,255,0.015)" stroke-width="1" />
			<text x={x(tick)} y={height - 8} text-anchor="middle" fill="#7A7F8E" font-size="10" font-family="Inter" font-weight="500">Yr {tick}</text>
		{/each}

		<!-- Regret overlay -->
		{#if showRegret && regretData}
			<path d={regretArea} fill="url(#regretGrad)" style="opacity: 0.8; transition: d 0.6s ease;" />
			<path d={regretPath} fill="none" stroke="#FF4D4D" stroke-width="1.5" stroke-opacity="0.6" stroke-dasharray="6 4" style="transition: d 0.6s ease;" />
		{/if}

		<!-- Main area + line -->
		<path d={mainArea} fill="url(#areaGrad)" style="transition: d 0.6s ease;" />
		<path d={mainPath} fill="none" stroke="#3A86FF" stroke-width="2" stroke-linecap="round" filter="url(#lineGlow)" style="transition: d 0.6s ease;" />

		<!-- Hover crosshair -->
		{#if hoverYear !== null}
			<line x1={hoverX} y1={padding.top} x2={hoverX} y2={padding.top + chartHeight} stroke="rgba(58,134,255,0.25)" stroke-width="1" stroke-dasharray="3 3" />
			<line x1={padding.left} y1={hoverY} x2={width - padding.right} y2={hoverY} stroke="rgba(58,134,255,0.1)" stroke-width="1" stroke-dasharray="3 3" />
			<circle cx={hoverX} cy={hoverY} r="6" fill="#3A86FF" stroke="#0B0B0F" stroke-width="2.5" filter="url(#dotGlow)" />

			<!-- Tooltip bg -->
			<rect x={hoverX - 52} y={hoverY - 38} width="104" height="26" rx="8" fill="rgba(18,18,26,0.92)" stroke="rgba(58,134,255,0.2)" stroke-width="1" />
			<text x={hoverX} y={hoverY - 21} text-anchor="middle" fill="#EAEAF0" font-size="10" font-weight="700" font-family="Inter">{formatTooltip(hoverValue)}</text>
		{/if}

		<!-- End dot -->
		{#if data.length > 0 && hoverYear === null}
			{@const last = data[data.length - 1]}
			<circle cx={x(last.year)} cy={y(last.value)} r="5" fill="#3A86FF" stroke="#0B0B0F" stroke-width="2" filter="url(#dotGlow)" style="transition: cx 0.6s ease, cy 0.6s ease;" />
			<circle cx={x(last.year)} cy={y(last.value)} r="12" fill="none" stroke="#3A86FF" stroke-width="1" opacity="0.2" style="transition: cx 0.6s ease, cy 0.6s ease;" />
		{/if}
	</svg>

	<!-- Year label on hover -->
	{#if hoverYear !== null}
		<div class="hover-year" style="left: {(hoverX / width) * 100}%;">
			Year {hoverYear}
		</div>
	{/if}
</div>

<style>
	.chart-wrapper {
		width: 100%;
		aspect-ratio: 16/9;
		max-height: 400px;
		min-height: 280px;
		position: relative;
		cursor: crosshair;
	}

	.chart-svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.hover-year {
		position: absolute;
		bottom: 4px;
		transform: translateX(-50%);
		font-size: 0.65rem;
		font-weight: 600;
		color: #3A86FF;
		background: rgba(18, 18, 26, 0.9);
		padding: 0.15rem 0.5rem;
		border-radius: 4px;
		border: 1px solid rgba(58, 134, 255, 0.15);
		pointer-events: none;
	}
</style>
