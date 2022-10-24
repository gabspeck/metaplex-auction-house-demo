<script>

	import { metaplexStore } from '../../stores/index.js';
	import { toBigNumber, walletAdapterIdentity } from '@metaplex-foundation/js';
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let album = {
		title: 'Another Green World',
		artist: 'Brian Eno',
		year: 1975,
		price: 20.00,
		royalties: 5,
		art: 'file.path'
	}

	/**@param e {SubmitEvent}**/
	const onSubmit = async (e) => {
		e.preventDefault()

		console.log({wallet: $walletStore})

		const result = await $metaplexStore
			.use(walletAdapterIdentity($walletStore))
			.nfts()
			.create({
				name: album.title,
				sellerFeeBasisPoints: parseInt(album.royalties.toString().replace('.', '').padEnd(4, '0')),
				uri: 'http://example.com',
				maxSupply: toBigNumber(0)
			})
		console.log({result})
	}
</script>

<form class='w-full' on:submit={onSubmit}>
	<div class='mb-6'>
		<label for='title' class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Album title</label>
		<input type='text' id='title' name='title'
					 bind:value={album.title}
					 class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					 placeholder='Another Green World' required>
	</div>
	<div class='mb-6'>
		<label for='artist' class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Artist</label>
		<input type='text' id='artist' name='artist'
					 bind:value={album.artist}
					 class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					 placeholder='Brian Eno'
					 required>
	</div>
	<div class='mb-6'>
		<label for='year' class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Year</label>
		<input type='number' min='1900' max='9999' id='year'
					 bind:value={album.year}
					 class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					 placeholder='1975'
					 required>
	</div>
	<div class='mb-6'>
		<label for='price' class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Asking price</label>
		<input type='number' min='0.01' id='price' step='0.01' name='price'
					 bind:value={album.price}
					 class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					 placeholder='20.00'
					 required>
	</div>
	<div class='mb-6'>
		<label for='royalties' class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Royalties %</label>
		<input type='number' min='0.01' id='royalties' step='0.01' name='price'
					 bind:value={album.royalties}
					 class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					 placeholder='5.00'
					 required>
	</div>
	<div class='mb-6'>
		<label for='cover' class='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Cover art</label>
		<input type='file' id='cover' name='cover'
					 bind:value={album.art}
					 class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
					 placeholder='20.00'
					 required>
	</div>
	<button type='submit'
					class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
		Submit
	</button>
</form>

