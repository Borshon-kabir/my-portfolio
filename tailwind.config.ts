import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#0a0a0a', panel: '#171717', cream: '#EDEDEC', amber: '#ffffff', muted: '#a3a3a3' }, fontFamily: { serif: ['var(--font-serif)', 'serif'], display: ['var(--font-serif)', 'serif'], body: ['var(--font-body)', 'sans-serif'], mono: ['var(--font-mono)', 'monospace'] }, transitionTimingFunction: { cinema: 'cubic-bezier(0.16, 1, 0.3, 1)' } } }, plugins: [] };
export default config;
