import { sveltekit } from '@sveltejs/kit/vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import path from 'path';
import inject from '@rollup/plugin-inject';

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
			stream: 'rollup-plugin-node-polyfills/polyfills/stream'
		}
	},
	define: {
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
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] }), nodePolyfills({ crypto: true })]
		}
	},
	server: {
		fs: {
			allow: ['.yalc']
		}
	}
};

export default config;
