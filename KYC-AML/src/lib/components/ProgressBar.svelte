<script lang="ts">
	interface Props {
		currentStep: number;
		totalSteps: number;
		progress: number;
		accessibilityMode?: boolean;
	}
	
	let { currentStep, totalSteps, progress, accessibilityMode = false }: Props = $props();
</script>

<div class="progress-section">
	<div class="progress-label">STEP {currentStep} OF {totalSteps}</div>
	<div class="progress-track" class:accessibility-bar={accessibilityMode}>
		<div class="progress-fill" style="width: {progress}%"></div>
	</div>
</div>

<style>
	.progress-section {
		padding: 0 var(--padding-screen);
		margin-bottom: 1rem;
	}
	
	.progress-label {
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		margin-bottom: 0.5rem;
	}
	
	.progress-track {
		height: 4px;
		background: var(--border-subtle);
		border-radius: var(--radius-full);
		overflow: hidden;
	}
	
	.progress-track.accessibility-bar {
		height: 6px;
	}
	
	.progress-fill {
		height: 100%;
		background: var(--primary);
		border-radius: var(--radius-full);
		transition: width 300ms ease-out;
	}
</style>
