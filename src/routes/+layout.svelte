<script>
	import 'carbon-components-svelte/css/white.css';
	import { onMount } from 'svelte';
	import { clusterApiUrl } from '@solana/web3.js';
	import { ConnectionProvider, WalletMultiButton, WalletProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import { titleStore } from '../stores/index.js';
	import {
		Content,
		Grid,
		Header,
		HeaderAction,
		HeaderNav,
		HeaderNavItem, HeaderPanelDivider, HeaderPanelLink, HeaderPanelLinks,
		HeaderUtilities
	} from 'carbon-components-svelte';
	import { UserAvatarFilledAlt } from 'carbon-icons-svelte';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet
	const links = {
		['/mint']: 'Mint',
		['/sell']: 'Sell',
		['/gallery']: 'Gallery'
	};
	let wallets;

	onMount(async () => {
		const { PhantomWalletAdapter } = await import('@solana/wallet-adapter-wallets');

		wallets = [new PhantomWalletAdapter()];
	});
</script>

<svelte:head>
	<title>{$titleStore ? `${$titleStore} | ` : ''}Auction House</title>
</svelte:head>

<Header company='Auction House' platformName='Demo'>
	<WalletProvider {localStorageKey} {wallets} autoConnect />
	<ConnectionProvider {network} />
	<HeaderNav>
		{#each Object.entries(links) as [href, text]}
			<HeaderNavItem {href} {text} />
		{/each}
	</HeaderNav>
	<HeaderUtilities>
		<WalletMultiButton />
	</HeaderUtilities>
</Header>
<Content>
	<Grid>
		<h1>{$titleStore}</h1>
		<slot />
	</Grid>
</Content>
