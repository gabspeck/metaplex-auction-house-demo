import { readable } from 'svelte/store';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js';

/**
 *
 * @type {Metaplex}
 */
export const metaplexStore = readable(null, (set) => {
	const metaplex = new Metaplex(new Connection(clusterApiUrl('devnet')));
	set(metaplex);
});
