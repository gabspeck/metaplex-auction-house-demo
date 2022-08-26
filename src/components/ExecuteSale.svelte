<script>
    import {Cell} from '@smui/layout-grid'
    import Button from '@smui/button'
    import {
        auctionHouseStore,
        buyerStore,
        metaplexStore,
        mintStore,
        priceStore,
        sellerStore,
    } from '../stores'
    import {PublicKey} from "@solana/web3.js";
    import {Token, TOKEN_PROGRAM_ID} from "@solana/spl-token";
    import BN from "bn.js";
    import {
        findAssociatedTokenAccountPda,
        findAuctionHouseTradeStatePda,
        toBigNumber,
        toPublicKey, walletAdapterIdentity
    } from "@metaplex-foundation/js";
    import {walletStore} from "@svelte-on-solana/wallet-adapter-core";

    let actualSellerTradeState = ''
    let actualBuyerTradeState = ''
    let executionReceipt = ''
    let executing = false
    let error = ''

    const getPriceWithMantissa = async (
        connection,
        price,
        mint
    ) => {
        const token = new Token(
            connection,
            new PublicKey(mint),
            TOKEN_PROGRAM_ID,
            {},
        );
        const mantissa = 10 ** (await token.getMintInfo()).decimals

        return Math.ceil(price * mantissa)
    }

    const executeSale = async () => {
        executing = true
        executionReceipt = ''
        error = ''
        const auctionHouse = await $metaplexStore.auctions().findAuctionHouseByAddress($auctionHouseStore).run()

        const adjustedTokenSize = new BN(await getPriceWithMantissa($metaplexStore.connection, 1, new PublicKey($mintStore)))
        const adjustedPrice = new BN(await getPriceWithMantissa($metaplexStore.connection, $priceStore, auctionHouse.treasuryMint.address))

        const sellerTokenAccount = findAssociatedTokenAccountPda(toPublicKey($mintStore), toPublicKey($sellerStore))
        actualSellerTradeState = findAuctionHouseTradeStatePda(
            $auctionHouseStore,
            toPublicKey($sellerStore),
            auctionHouse.treasuryMint.address,
            toPublicKey($mintStore),
            toBigNumber(adjustedPrice),
            toBigNumber(adjustedTokenSize),
            sellerTokenAccount
        )
        actualBuyerTradeState = findAuctionHouseTradeStatePda(
            $auctionHouseStore,
            toPublicKey($buyerStore),
            auctionHouse.treasuryMint.address,
            toPublicKey($mintStore),
            toBigNumber(adjustedPrice),
            toBigNumber(adjustedTokenSize),
            sellerTokenAccount // remove this if it's a public bid
        );
        const client = $metaplexStore
            .use(walletAdapterIdentity($walletStore.wallet))
            .auctions()
            .for(auctionHouse)
        const bid = await client
            .findBidByTradeState(actualBuyerTradeState).run()
        const listing = await client.findListingByAddress(actualSellerTradeState).run()
        try {
            const result = await client.executeSale({
                bid,
                listing
            }).run()
            executionReceipt = result.receipt.toBase58()
        } catch(e){
            error = e.message
        } finally {
            executing = false
        }

    }

</script>
<Cell span={12}>
    <Button on:click={executeSale} disabled={executing}>Execute sale</Button>
    {#if executionReceipt}
        <p>
            Execution receipt: {executionReceipt}
        </p>
    {/if}
    {#if error}
        <p>Error: {error}</p>
    {/if}
</Cell>