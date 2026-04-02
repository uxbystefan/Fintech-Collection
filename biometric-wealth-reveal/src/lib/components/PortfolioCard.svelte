<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { Asset } from '$lib/data';
	import { formatCurrency, formatPercent, formatCompact } from '$lib/format';

	let {
		assets,
		isRevealed = false,
		tweenProgress = 0
	}: {
		assets: Asset[];
		isRevealed: boolean;
		tweenProgress: number;
	} = $props();

	function tweenedValue(target: number): string {
		return formatCurrency(target * tweenProgress);
	}

	function tweenedCompact(target: number): string {
		return formatCompact(target * tweenProgress);
	}

	function tweenedPercent(target: number): string {
		const val = target * tweenProgress;
		const sign = val >= 0 ? '+' : '';
		return `${sign}${val.toFixed(2)}%`;
	}
</script>

<!-- Animated gradient border wrapper -->
<div class="card-border-wrap" class:revealed={isRevealed}>
	<div class="card" class:revealed={isRevealed}>
		<!-- Noise texture overlay -->
		<div class="noise-overlay"></div>

		<!-- Top shimmer line -->
		<div class="shimmer-line"></div>

		<!-- Card Header -->
		<div class="card-header">
			<div class="header-left">
				<div class="logo-mark">
					<div class="logo-inner">W</div>
				</div>
				<div class="header-meta">
					<span class="label-sm">PORTFOLIO</span>
					<span class="account-id">••• 4291</span>
				</div>
			</div>
			<div class="header-right">
				<div class="status-pill">
					<div class="status-dot"></div>
					<span class="status-text">LIVE</span>
				</div>
			</div>
		</div>

		<!-- Total Value -->
		<div class="total-section">
			<span class="total-label">Total Net Value</span>
			<div class="total-value-row">
				<span class="total-value blurrable" class:blur={!isRevealed}>
					{#if isRevealed}
						<span class="currency-sign">$</span>{tweenedValue(2_847_392.41).replace('$', '')}
					{:else}
						<span class="currency-sign">$</span>2,847,392.41
					{/if}
				</span>
			</div>
			<div class="change-row blurrable" class:blur={!isRevealed}>
				{#if isRevealed}
					<span class="change-badge positive">
						<span class="arrow">&#9650;</span>
						{tweenedValue(23_841.17).replace('$', '$')}
					</span>
					<span class="change-pct positive">({tweenedPercent(0.84)})</span>
				{:else}
					<span class="change-badge positive">
						<span class="arrow">&#9650;</span>
						$23,841.17
					</span>
					<span class="change-pct positive">(+0.84%)</span>
				{/if}
				<span class="change-period">24h</span>
			</div>
		</div>

		<!-- Allocation Bar (stacked) -->
		<div class="alloc-bar-container">
			{#each assets as asset}
				<div
					class="alloc-segment"
					style="width: {asset.allocation}%; background: {asset.color};"
				></div>
			{/each}
		</div>

		<!-- Divider -->
		<div class="divider"></div>

		<!-- Asset Table -->
		<div class="asset-header-row">
			<span class="col-asset">Asset</span>
			<span class="col-alloc">Weight</span>
			<span class="col-value">Value</span>
			<span class="col-change">24h</span>
		</div>

		<div class="asset-list">
			{#each assets as asset, i}
				<div
					class="asset-row"
					in:fade={{ delay: isRevealed ? i * 60 : 0, duration: 300 }}
				>
					<div class="col-asset">
						<div class="asset-name-row">
							<div class="asset-color-dot" style="background: {asset.color};"></div>
							<span class="asset-label">{asset.label}</span>
						</div>
						<span class="asset-ticker">{asset.ticker}</span>
					</div>
					<div class="col-alloc">
						<span class="alloc-number font-tabular">{asset.allocation}%</span>
						<div class="alloc-mini-bar">
							<div class="alloc-mini-fill" style="width: {asset.allocation}%; background: {asset.color};"></div>
						</div>
					</div>
					<span class="col-value font-tabular blurrable" class:blur={!isRevealed}>
						{#if isRevealed}
							{tweenedCompact(asset.value)}
						{:else}
							{formatCompact(asset.value)}
						{/if}
					</span>
					<span
						class="col-change font-tabular blurrable"
						class:blur={!isRevealed}
						class:positive={asset.change24h >= 0}
						class:negative={asset.change24h < 0}
					>
						{#if isRevealed}
							{tweenedPercent(asset.change24h)}
						{:else}
							{formatPercent(asset.change24h)}
						{/if}
					</span>
				</div>
			{/each}
		</div>


	</div>
</div>

<style>
	/* --- Animated Gradient Border --- */
	.card-border-wrap {
		position: relative;
		width: 100%;
		border-radius: 20px;
		padding: 1px;
		background: linear-gradient(135deg, rgba(69, 214, 239, 0.08), rgba(69, 214, 239, 0.02), rgba(123, 140, 222, 0.06));
		background-size: 200% 200%;
		animation: border-shift 6s ease-in-out infinite;
	}

	.card-border-wrap.revealed {
		background: conic-gradient(from var(--border-angle, 0deg), rgba(69, 214, 239, 0.25), rgba(123, 140, 222, 0.15), rgba(52, 211, 153, 0.15), rgba(69, 214, 239, 0.25));
		animation: border-rotate 4s linear infinite;
	}

	@keyframes border-shift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}

	@keyframes border-rotate {
		to { --border-angle: 360deg; }
	}

	@property --border-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	/* --- Card --- */
	.card {
		width: 100%;
		border-radius: 19px;
		background: linear-gradient(165deg, #111118 0%, #0D0D13 50%, #0B0B0F 100%);
		padding: 18px 16px 12px;
		position: relative;
		overflow: hidden;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.03),
			inset 0 -1px 0 rgba(0, 0, 0, 0.2),
			0 8px 32px rgba(0, 0, 0, 0.4);
	}

	/* Noise grain texture */
	.noise-overlay {
		position: absolute;
		inset: 0;
		border-radius: 19px;
		opacity: 0.35;
		mix-blend-mode: overlay;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-repeat: repeat;
		background-size: 128px 128px;
		z-index: 0;
	}

	/* Shimmer top line */
	.shimmer-line {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 1px;
		background: linear-gradient(90deg, transparent 0%, rgba(69, 214, 239, 0.2) 30%, rgba(123, 140, 222, 0.15) 50%, rgba(69, 214, 239, 0.2) 70%, transparent 100%);
		background-size: 200% 100%;
		animation: shimmer-slide 3s ease-in-out infinite;
		z-index: 2;
	}

	@keyframes shimmer-slide {
		0%, 100% { background-position: 200% 0; }
		50% { background-position: -200% 0; }
	}

	/* --- Header --- */
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 16px;
		position: relative;
		z-index: 1;
	}

	.header-left {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.logo-mark {
		width: 28px;
		height: 28px;
		border-radius: 8px;
		background: linear-gradient(135deg, rgba(69, 214, 239, 0.12), rgba(69, 214, 239, 0.04));
		border: 1px solid rgba(69, 214, 239, 0.15);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo-inner {
		font-size: 12px;
		font-weight: 800;
		color: #45D6EF;
		letter-spacing: -0.02em;
	}

	.header-meta {
		display: flex;
		flex-direction: column;
		gap: 1px;
	}

	.label-sm {
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.12em;
		color: var(--text-muted, #555B68);
	}

	.account-id {
		font-size: 10px;
		color: var(--text-secondary, #8A92A0);
		font-variant-numeric: tabular-nums;
	}

	.header-right {
		display: flex;
		align-items: center;
	}

	.status-pill {
		display: flex;
		align-items: center;
		gap: 5px;
		padding: 3px 8px;
		border-radius: 10px;
		background: rgba(52, 211, 153, 0.06);
		border: 1px solid rgba(52, 211, 153, 0.12);
	}

	.status-dot {
		width: 5px;
		height: 5px;
		border-radius: 50%;
		background: #34D399;
		box-shadow: 0 0 6px rgba(52, 211, 153, 0.5);
		animation: dot-pulse 2s ease-in-out infinite;
	}

	@keyframes dot-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	.status-text {
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: #34D399;
	}

	/* --- Total Value --- */
	.total-section {
		margin-bottom: 16px;
		position: relative;
		z-index: 1;
	}

	.total-label {
		font-size: 10px;
		font-weight: 500;
		letter-spacing: 0.1em;
		color: var(--text-muted, #555B68);
		text-transform: uppercase;
		display: block;
		margin-bottom: 6px;
	}

	.total-value-row {
		margin-bottom: 8px;
	}

	.total-value {
		font-size: 34px;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: #FFFFFF;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		transition: filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
		text-shadow: 0 0 60px rgba(69, 214, 239, 0.08);
	}

	.currency-sign {
		font-weight: 500;
		font-size: 22px;
		color: var(--text-secondary, #8A92A0);
		margin-right: 1px;
		vertical-align: baseline;
	}

	.change-row {
		display: flex;
		align-items: center;
		gap: 6px;
		transition: filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.change-badge {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		font-size: 12px;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
	}

	.arrow {
		font-size: 8px;
	}

	.change-pct {
		font-size: 11px;
		font-weight: 500;
		opacity: 0.7;
	}

	.change-period {
		font-size: 9px;
		color: var(--text-muted, #555B68);
		margin-left: 2px;
		padding: 1px 5px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.03);
	}

	.positive { color: #34D399; }
	.negative { color: #F87171; }

	/* --- Allocation Bar --- */
	.alloc-bar-container {
		display: flex;
		width: 100%;
		height: 4px;
		border-radius: 2px;
		overflow: hidden;
		gap: 2px;
		margin-bottom: 16px;
		position: relative;
		z-index: 1;
	}

	.alloc-segment {
		height: 100%;
		border-radius: 2px;
		opacity: 0.6;
		transition: opacity 0.3s ease;
	}

	.card:hover .alloc-segment,
	.card.revealed .alloc-segment {
		opacity: 0.85;
	}

	/* --- Divider --- */
	.divider {
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent);
		margin-bottom: 10px;
	}

	/* --- Asset Table --- */
	.asset-header-row {
		display: grid;
		grid-template-columns: 1fr 50px 68px 52px;
		gap: 4px;
		padding: 0 2px 6px;
		margin-bottom: 2px;
		position: relative;
		z-index: 1;
	}

	.asset-header-row span {
		font-size: 9px;
		font-weight: 600;
		letter-spacing: 0.1em;
		color: var(--text-muted, #555B68);
		text-transform: uppercase;
	}

	.col-value, .col-change, .col-alloc {
		text-align: right;
	}

	.asset-list {
		display: flex;
		flex-direction: column;
		gap: 1px;
		position: relative;
		z-index: 1;
	}

	.asset-row {
		display: grid;
		grid-template-columns: 1fr 50px 68px 52px;
		gap: 4px;
		padding: 7px 2px;
		border-radius: 8px;
		transition: background 0.2s ease;
	}

	.asset-row:hover {
		background: rgba(255, 255, 255, 0.02);
	}

	.asset-row .col-asset {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.asset-name-row {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.asset-color-dot {
		width: 6px;
		height: 6px;
		border-radius: 2px;
		flex-shrink: 0;
	}

	.asset-label {
		font-size: 12px;
		font-weight: 500;
		color: var(--text-primary, #E8ECF1);
	}

	.asset-ticker {
		font-size: 9px;
		font-weight: 600;
		color: var(--text-muted, #555B68);
		letter-spacing: 0.06em;
		margin-left: 12px;
	}

	.asset-row .col-alloc {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		gap: 3px;
	}

	.alloc-number {
		font-size: 11px;
		font-weight: 500;
		color: var(--text-secondary, #8A92A0);
	}

	.alloc-mini-bar {
		width: 100%;
		height: 2px;
		border-radius: 1px;
		background: rgba(255, 255, 255, 0.04);
		overflow: hidden;
	}

	.alloc-mini-fill {
		height: 100%;
		border-radius: 1px;
		opacity: 0.5;
		transition: opacity 0.3s ease;
	}

	.asset-row:hover .alloc-mini-fill {
		opacity: 0.8;
	}

	.asset-row .col-value {
		font-size: 12px;
		font-weight: 600;
		color: var(--text-primary, #E8ECF1);
		align-self: center;
		text-align: right;
		font-variant-numeric: tabular-nums;
		transition: filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.asset-row .col-change {
		font-size: 11px;
		font-weight: 600;
		align-self: center;
		text-align: right;
		font-variant-numeric: tabular-nums;
		transition: filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	/* --- Blur States --- */
	.blurrable {
		transition: filter 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}

	.blurrable.blur {
		filter: blur(28px);
	}

	/* --- Footer --- */
	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 12px;
		padding-top: 10px;
		border-top: 1px solid rgba(255, 255, 255, 0.03);
		position: relative;
		z-index: 1;
	}

	.footer-left {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.footer-dot {
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: rgba(69, 214, 239, 0.3);
	}

	.footer-text {
		font-size: 9px;
		font-weight: 500;
		letter-spacing: 0.04em;
		color: var(--text-muted, #555B68);
	}
</style>
