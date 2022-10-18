import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	preprocess: [
		// needed by tailwind
		preprocess({
			postcss: true
		})
	],
	vitePlugin: {
		experimental: {
			inspector: true
		}
	}
};

export default config;
