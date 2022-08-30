import { writable } from 'svelte/store';

export const titleStore = (() => {
	const suffix = 'Auction House';
	const { subscribe, set } = writable(suffix)


	return {
		subscribe,
		set: value => {
			if (value) {
				set(`${value} | ${suffix}`);
			} else {
				set(suffix);
			}
		},
	};
})();
