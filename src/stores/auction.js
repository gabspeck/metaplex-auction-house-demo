import {readable, writable} from "svelte/store";
import {PublicKey} from "@solana/web3.js";

export const auctionHouseStore = readable(new PublicKey('55F7z6HaPvJudFovmHxdJasYQKk3ba1kmmr9BdGftc3i'))
export const mintStore = writable('')
export const priceStore = writable(0)
export const sellerStore = writable('')
export const buyerStore = writable('')
export const sellerTradeStateStore = writable('')
export const buyerTradeStateStore = writable('')
export const listingReceiptStore = writable('')
export const bidReceiptStore = writable('')
export const listingStore = writable('')
