/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#0B0B0F',
				surface: '#111118',
				'surface-light': '#1A1A24',
				cyan: {
					DEFAULT: '#45D6EF',
					dim: 'rgba(69, 214, 239, 0.4)',
					border: 'rgba(69, 214, 239, 0.1)',
					glow: 'rgba(69, 214, 239, 0.15)',
					'glow-strong': 'rgba(69, 214, 239, 0.3)'
				},
				'text-primary': '#E8ECF1',
				'text-secondary': '#8A92A0',
				'text-muted': '#555B68',
				positive: '#34D399',
				negative: '#F87171'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
			},
			boxShadow: {
				'cyan-glow': '0 0 24px rgba(69, 214, 239, 0.12)',
				'cyan-glow-lg': '0 0 48px rgba(69, 214, 239, 0.2)',
				'cyan-ring': '0 0 0 2px rgba(69, 214, 239, 0.3), 0 0 40px rgba(69, 214, 239, 0.15)'
			}
		}
	},
	plugins: []
};
