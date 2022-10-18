<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { clusterApiUrl } from '@solana/web3.js';
  import {
    ConnectionProvider,
    WalletMultiButton,
    WalletProvider
  } from '@svelte-on-solana/wallet-adapter-ui';

  const localStorageKey = 'walletAdapter';
  const network = clusterApiUrl('devnet'); // localhost or mainnet
  const links = {
    ['/gallery']: 'Gallery',
    ['/mint']: 'Mint',
    ['/sell']: 'Sell'
  };
  let wallets;

  onMount(async () => {
    const { PhantomWalletAdapter } = await import('@solana/wallet-adapter-wallets');

    wallets = [new PhantomWalletAdapter()];
  });
</script>

<svelte:head>
  <title>Auction House</title>
</svelte:head>

<header class="bg-purple-500 p-30">
  <div class="flex justify-between items-center container m-auto">
    <nav class="flex ml-2 text-xl">
      {#each Object.entries(links) as [href, text]}
        <a class="text-opacity-50 text-white hover:text-opacity-100 pr-5" {href}>{text}</a>
      {/each}
    </nav>
    <div class="p-2">
      <WalletProvider {localStorageKey} {wallets} autoConnect />
      <ConnectionProvider {network} />
      <WalletMultiButton />
    </div>
  </div>
</header>
<div class="p-30 flex justify-center">
  <div class="container">
    <slot/>
  </div>
</div>

<style global>
  .container {
    max-width: 1200px;
  }
</style>
