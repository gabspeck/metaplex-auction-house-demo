<script>
    import {onMount} from 'svelte';
    import {clusterApiUrl} from '@solana/web3.js';
    import {ConnectionProvider, WalletMultiButton, WalletProvider} from '@svelte-on-solana/wallet-adapter-ui';

    const localStorageKey = 'walletAdapter';
    const network = clusterApiUrl('devnet'); // localhost or mainnet

    let wallets;

    onMount(async () => {
        const {
            PhantomWalletAdapter,
        } = await import('@solana/wallet-adapter-wallets');

        wallets = [
            new PhantomWalletAdapter(),
        ];
    });
</script>

<WalletProvider {localStorageKey} {wallets} autoConnect />
<ConnectionProvider {network} />
<WalletMultiButton />
<div>
    <slot />
</div>
