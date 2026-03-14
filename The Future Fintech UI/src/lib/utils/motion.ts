// Motion system utilities and reduced motion support

export const motionDurations = {
	micro: '150ms',
	normal: '250ms',
	large: '400ms'
} as const;

export const motionEasing = {
	standard: 'ease-out',
	emphasized: 'cubic-bezier(0.4, 0, 0.2, 1)',
	bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
} as const;

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Get animation duration respecting user preferences
export function getAnimationDuration(duration: keyof typeof motionDurations): string {
	return prefersReducedMotion() ? '0.01ms' : motionDurations[duration];
}

// Stagger delay calculator for sequential animations
export function staggerDelay(index: number, baseDelay: number = 100): number {
	return prefersReducedMotion() ? 0 : index * baseDelay;
}
