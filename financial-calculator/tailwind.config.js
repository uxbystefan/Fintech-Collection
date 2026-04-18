/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				bg: '#0B0B0F',
				surface: '#12121A',
				'surface-light': '#1A1A26',
				'text-primary': '#EAEAF0',
				'text-secondary': '#A0A0B2',
				'text-muted': '#555B68',
				green: {
					DEFAULT: '#00E38C',
					dim: 'rgba(0, 227, 140, 0.4)',
					glow: 'rgba(0, 227, 140, 0.15)'
				},
				blue: {
					DEFAULT: '#3A86FF',
					dim: 'rgba(58, 134, 255, 0.4)',
					glow: 'rgba(58, 134, 255, 0.15)'
				},
				orange: {
					DEFAULT: '#FF7A00',
					dim: 'rgba(255, 122, 0, 0.4)',
					glow: 'rgba(255, 122, 0, 0.15)',
					'glow-strong': 'rgba(255, 122, 0, 0.3)'
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
			},
			boxShadow: {
				'orange-glow': '0 0 24px rgba(255, 122, 0, 0.12)',
				'orange-glow-lg': '0 0 48px rgba(255, 122, 0, 0.2)',
				'green-glow': '0 0 24px rgba(0, 227, 140, 0.12)',
				'green-glow-lg': '0 0 48px rgba(0, 227, 140, 0.2)',
				'glass': '0 8px 32px rgba(0, 0, 0, 0.3)'
			}
		}
	},
	plugins: []
};
