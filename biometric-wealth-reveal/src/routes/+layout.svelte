<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="phone-showcase">
	<!-- Phone Device Frame -->
	<div class="phone-device">
		<!-- Bezel highlights -->
		<div class="bezel-shine"></div>

		<!-- Phone Screen -->
		<div class="phone-screen">
			<!-- Status Bar -->
			<div class="status-bar">
				<span class="status-time">9:41</span>
				<div class="status-notch">
					<div class="notch-camera"></div>
				</div>
				<div class="status-icons">
					<div class="signal-bars">
						<div class="bar bar-1"></div>
						<div class="bar bar-2"></div>
						<div class="bar bar-3"></div>
						<div class="bar bar-4"></div>
					</div>
					<span class="status-wifi">WiFi</span>
					<div class="status-battery">
						<div class="battery-fill"></div>
					</div>
				</div>
			</div>

			<!-- App Content -->
			<div class="app-frame">
				{@render children()}
			</div>

			<!-- Home Indicator -->
			<div class="home-indicator-area">
				<div class="home-indicator"></div>
			</div>
		</div>

		<!-- Side buttons -->
		<div class="btn-power"></div>
		<div class="btn-vol-up"></div>
		<div class="btn-vol-down"></div>
	</div>
</div>

<style>
	.phone-showcase {
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		overflow: hidden;
	}

	/* Subtle radial bg glow behind phone */
	.phone-showcase::before {
		content: '';
		position: absolute;
		width: 600px;
		height: 600px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(69, 214, 239, 0.03) 0%, transparent 70%);
		pointer-events: none;
	}

	/* Phone Device */
	.phone-device {
		position: relative;
		width: 375px;
		height: 812px;
		border-radius: 52px;
		background: #1A1A1E;
		box-shadow:
			0 0 0 1px rgba(255, 255, 255, 0.06),
			0 0 0 2px #0D0D10,
			0 20px 60px rgba(0, 0, 0, 0.6),
			0 0 80px rgba(69, 214, 239, 0.04);
		padding: 12px;
		overflow: hidden;
	}

	.bezel-shine {
		position: absolute;
		top: -1px;
		left: 30%;
		right: 30%;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
		z-index: 2;
	}

	/* Phone Screen */
	.phone-screen {
		width: 100%;
		height: 100%;
		border-radius: 42px;
		background: #0B0B0F;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	/* iOS-style Status Bar */
	.status-bar {
		width: 100%;
		height: 54px;
		padding: 14px 24px 0;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		position: relative;
		z-index: 10;
		flex-shrink: 0;
	}

	.status-time {
		font-size: 15px;
		font-weight: 600;
		color: #E8ECF1;
		letter-spacing: 0.02em;
		min-width: 54px;
	}

	.status-notch {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 126px;
		height: 34px;
		background: #0D0D10;
		border-radius: 0 0 20px 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.notch-camera {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #16161A;
		box-shadow: inset 0 0 2px rgba(69, 214, 239, 0.15);
		margin-top: 4px;
	}

	.status-icons {
		display: flex;
		align-items: center;
		gap: 6px;
	}

	.signal-bars {
		display: flex;
		align-items: flex-end;
		gap: 1.5px;
		height: 11px;
	}

	.bar {
		width: 3px;
		border-radius: 1px;
		background: #E8ECF1;
	}
	.bar-1 { height: 4px; }
	.bar-2 { height: 6px; }
	.bar-3 { height: 8px; }
	.bar-4 { height: 11px; }

	.status-wifi {
		font-size: 10px;
		font-weight: 600;
		color: #E8ECF1;
		letter-spacing: 0.02em;
	}

	.status-battery {
		width: 25px;
		height: 11px;
		border-radius: 3px;
		border: 1.5px solid rgba(232, 236, 241, 0.4);
		padding: 1.5px;
		position: relative;
	}

	.status-battery::after {
		content: '';
		position: absolute;
		right: -4px;
		top: 50%;
		transform: translateY(-50%);
		width: 2px;
		height: 5px;
		border-radius: 0 1px 1px 0;
		background: rgba(232, 236, 241, 0.4);
	}

	.battery-fill {
		width: 80%;
		height: 100%;
		border-radius: 1px;
		background: #34D399;
	}

	/* App Content Area */
	.app-frame {
		flex: 1;
		min-height: 0;
		position: relative;
		overflow: hidden;
		background: #0B0B0F;
	}

	/* Home Indicator */
	.home-indicator-area {
		width: 100%;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.home-indicator {
		width: 134px;
		height: 5px;
		border-radius: 3px;
		background: rgba(232, 236, 241, 0.2);
	}

	/* Side Buttons */
	.btn-power {
		position: absolute;
		right: -2px;
		top: 170px;
		width: 3px;
		height: 80px;
		border-radius: 0 2px 2px 0;
		background: #22222A;
		box-shadow: 1px 0 4px rgba(0,0,0,0.3);
	}

	.btn-vol-up {
		position: absolute;
		left: -2px;
		top: 145px;
		width: 3px;
		height: 44px;
		border-radius: 2px 0 0 2px;
		background: #22222A;
		box-shadow: -1px 0 4px rgba(0,0,0,0.3);
	}

	.btn-vol-down {
		position: absolute;
		left: -2px;
		top: 200px;
		width: 3px;
		height: 44px;
		border-radius: 2px 0 0 2px;
		background: #22222A;
		box-shadow: -1px 0 4px rgba(0,0,0,0.3);
	}

	/* Responsive scaling — keep phone visible on all screens */
	@media (max-height: 860px) {
		.phone-device {
			transform: scale(0.88);
			transform-origin: center;
		}
	}

	@media (max-height: 740px) {
		.phone-device {
			transform: scale(0.75);
		}
	}

	@media (max-height: 620px) {
		.phone-device {
			transform: scale(0.62);
		}
	}
</style>
