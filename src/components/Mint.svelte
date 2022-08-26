<script>
    import Button from '@smui/button'
    import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
    import {walletAdapterIdentity} from '@metaplex-foundation/js'
    import {metaplexStore, mintStore, sellerStore} from "../stores"

    let minting = false
    /**@type{string}**/
    let resultStatus = ''
    const mint = async () => {
        minting = true
        resultStatus = ''
        try {
            const result = await $metaplexStore.use(walletAdapterIdentity($walletStore.wallet))
                .nfts().create({
                    uri: 'http://example.com',
                    name: 'NFT test',
                    sellerFeeBasisPoints: 500,
                    isMutable: true,
                    maxSupply: 1
                })
                .run()
            resultStatus = result.mintAddress.toBase58()
            $mintStore = resultStatus
            $sellerStore = $walletStore.wallet.publicKey.toBase58()
        } catch(e) {
            resultStatus = e.message
        } finally {
            minting = false
        }
    }
</script>

<Button on:click={mint} disabled={!$walletStore.connected || minting }>Mint</Button>
{#if resultStatus}
    <p>{resultStatus}</p>
{/if}
