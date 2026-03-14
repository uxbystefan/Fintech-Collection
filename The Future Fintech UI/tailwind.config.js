/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: '#0B0F14',
				card: '#11161D',
				elevated: '#161C24',
				border: '#1F2630',
				'text-primary': '#E6EDF3',
				'text-secondary': '#9AA6B2',
				'text-muted': '#7F8A96',
				neon: '#00FFA3',
				'neon-secondary': '#00D98C'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif']
			},
			boxShadow: {
				'glow': '0 0 20px rgba(0, 255, 163, 0.12)',
				'glow-lg': '0 0 30px rgba(0, 255, 163, 0.15)'
			}
		}
	},
	plugins: []
};
