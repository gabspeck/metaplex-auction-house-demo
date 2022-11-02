import { sveltekit } from '@sveltejs/kit/vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['@solana/web3.js', 'buffer'],
		esbuildOptions: {
			target: 'esnext',
			plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })]
		}
	},
	resolve: {
		alias: {
			$utils: path.resolve('src/utils/'),
			http: 'rollup-plugin-node-polyfills/polyfills/http',
			url: 'rollup-plugin-node-polyfills/polyfills/url',
			stream: 'rollup-plugin-node-polyfills/polyfills/stream',
			events: 'rollup-plugin-node-polyfills/polyfills/events',
			assert: 'assert',
			crypto: 'crypto-browserify',
			util: 'util'
		}
	},
	define: {
		'process.env': process.env ?? {},
		'process.env.BROWSER': true,
		'process.env.NODE_DEBUG': JSON.stringify(''),
		global: 'globalThis'
	},
	build: {
		target: 'esnext',
		commonjsOptions: {
			transformMixedEsModules: true
		},
		rollupOptions: {
			plugins: [nodePolyfills({crypto: true})]
		}
	},
	server: {
		fs: {
			allow: ['.yalc']
		}
	}
};

export default config;
