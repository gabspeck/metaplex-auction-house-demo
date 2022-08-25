<script>
    import {walletStore} from '@svelte-on-solana/wallet-adapter-core'
</script>
<div>You are{$walletStore.connected ? ' ' : ' not '}connected</div>
