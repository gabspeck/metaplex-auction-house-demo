<script>
    import Mint from "../components/Mint.svelte"
    import List from "../components/List.svelte"
    import Bid from '../components/Bid.svelte'
    import ExecuteSale from '../components/ExecuteSale.svelte'
    import {Cell} from '@smui/layout-grid'
</script>
<Cell span={12}>
    <Mint/>
</Cell>
<Cell span={12}>
    <List/>
</Cell>
<Cell span={12}>
    <Bid/>
</Cell>
<Cell span={12}>
    <ExecuteSale/>
</Cell>
