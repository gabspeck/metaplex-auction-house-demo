<script>
	import { onMount } from 'svelte';
	import { clusterApiUrl } from '@solana/web3.js';
	import { ConnectionProvider, WalletMultiButton, WalletProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import '../theme/_Typography.scss';
	import { titleStore } from '../stores/index.js';
	import {page} from '$app/stores'

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet
	const tabs = [
		'mint',
		'sell',
		'gallery'
	];
	let wallets;
	let activeTab = $page.routeId || 'mint'

	onMount(async () => {
		const {
			PhantomWalletAdapter
		} = await import('@solana/wallet-adapter-wallets');

		wallets = [
			new PhantomWalletAdapter()
		];

	});
</script>

<svelte:head>
	<title>{$titleStore}</title>
</svelte:head>

<LayoutGrid>
	<Cell span={12}>
		<TopAppBar variant='static'>
			<Row>
				<Section>
					<Title>Auction House demo</Title>
				</Section>
				<Section align='end'>
					<WalletProvider {localStorageKey} {wallets} autoConnect />
					<ConnectionProvider {network} />
					<WalletMultiButton />
				</Section>
			</Row>
		</TopAppBar>
	</Cell>
	<Cell span={12}>
		<TabBar {tabs} let:tab active={activeTab}>
			<Tab {tab}
			href='/{tab}'>
				<Label>{tab}</Label>
			</Tab>
		</TabBar>
	</Cell>
	<Cell span={12}>
		<slot />
	</Cell>
</LayoutGrid>
