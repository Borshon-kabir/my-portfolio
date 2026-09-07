import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#0E0E10', panel: '#17171A', cream: '#EDEDEC', amber: '#C6FF3D', muted: '#7A7A7E' }, fontFamily: { display: ['var(--font-display)'], body: ['var(--font-body)'], mono: ['var(--font-mono)'] }, transitionTimingFunction: { cinema: 'cubic-bezier(0.16, 1, 0.3, 1)' } } }, plugins: [] };
export default config;
