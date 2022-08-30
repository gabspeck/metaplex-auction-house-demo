<script>
	import { Cell } from '@smui/layout-grid';
	import Bid from '../../components/Bid.svelte';
	import ExecuteSale from '../../components/ExecuteSale.svelte';
	import { titleStore } from '../../stores/index.js';

	$titleStore = 'Gallery'
</script>

<Cell span={12}>
	<Bid/>
</Cell>
<Cell span={12}>
	<ExecuteSale/>
</Cell>
