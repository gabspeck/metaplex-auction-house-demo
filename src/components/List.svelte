<script>
    import Button from '@smui/button'
    import Textfield from '@smui/textfield'
    import {walletStore} from "@svelte-on-solana/wallet-adapter-core";
    import {auctionHouseStore, mintStore, priceStore, listingStore} from "../stores/index.js";
    import {metaplexStore, listingReceiptStore, sellerStore, sellerTradeStateStore} from "../stores/index.js";
    import {sol, walletAdapterIdentity} from "@metaplex-foundation/js";
    import {PublicKey} from "@solana/web3.js";

    let running = false
    let result = null

    /**
     *
     * @param mint{string}
     * @param price{number}
     * @returns {Promise<void>}
     */
    const list = async (mint, price) => {
        running = true
        result = ''
        try {
            const ahClient = await $metaplexStore.auctions().findAuctionHouseByAddress($auctionHouseStore).run()
            const listResult = await $metaplexStore.use(walletAdapterIdentity($walletStore.wallet))
                .auctions()
                .for(ahClient)
                .list({
                    mintAccount: new PublicKey(mint),
                    price: sol(price)
                })
                .run()
            console.log({listResult})
            result = listResult
            $sellerStore = $walletStore.wallet.publicKey.toBase58()
            $listingReceiptStore = listResult.listing.receiptAddress.toBase58()
            $sellerTradeStateStore = listResult.listing.tradeStateAddress.toBase58()
        } catch (e) {
            result = e.message
            console.error(e)
        } finally {
            running = false
        }
    }

</script>

<Button on:click={() => list($mintStore, $priceStore)} disabled={!$mintStore || running}>List</Button>
<Textfield bind:value={$mintStore} label="Mint"></Textfield>
<Textfield bind:value={$priceStore} label="Price" type="number"></Textfield>
{#if result}
    {#if result.listing}
        <p>Listing receipt: {result.listing.receiptAddress.toBase58()}</p>
        <p>Seller trade state: {result.listing.tradeStateAddress.toBase58()}</p>
    {:else}
        <p>{result}</p>
    {/if}
{/if}