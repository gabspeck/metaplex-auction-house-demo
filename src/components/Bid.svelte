<script>
    import Button from '@smui/button'
    import Textfield from '@smui/textfield'
    import {walletStore} from "@svelte-on-solana/wallet-adapter-core";
    import {
        auctionHouseStore,
        bidReceiptStore,
        buyerStore,
        buyerTradeStateStore,
        metaplexStore,
        mintStore,
        priceStore,
        sellerStore
    } from '../stores'
    import {sol, toPublicKey, walletAdapterIdentity} from "@metaplex-foundation/js";

    let running = false
    let result = null

    /**
     *
     * @param mint{string}
     * @param price{number}
     * @returns {Promise<void>}
     */
    const bid = async (mint, price) => {
        running = true
        result = ''
        try {
            const ahClient = await $metaplexStore.auctions().findAuctionHouseByAddress($auctionHouseStore).run()
            const bidResult = await $metaplexStore.use(walletAdapterIdentity($walletStore.wallet))
                .auctions()
                .for(ahClient)
                .bid({
                    seller: toPublicKey($sellerStore),
                    mintAccount: toPublicKey(mint),
                    price: sol(price)
                })
                .run()
            console.log({bidResult})
            $buyerStore = $walletStore.wallet.publicKey.toBase58()
            result = bidResult
            $buyerTradeStateStore = result.bid.tradeStateAddress.toBase58()
            $bidReceiptStore = result.bid.receiptAddress.toBase58()
        } catch (e) {
            result = e.message
            console.error(e)
        } finally {
            running = false
        }
    }

</script>

<Button on:click={() => bid($mintStore, $priceStore)} disabled={!$mintStore || running}>Bid</Button>
<Textfield bind:value={$mintStore} label="Mint"></Textfield>
<Textfield bind:value={$priceStore} label="Price" type="number"></Textfield>
{#if result}
    {#if result.bid}
        <p>Bid receipt: {result.bid.receiptAddress.toBase58()}</p>
        <p>Buyer trade state: {result.bid.tradeStateAddress.toBase58()}</p>
    {:else}
        <p>{result.message}</p>
    {/if}
{/if}