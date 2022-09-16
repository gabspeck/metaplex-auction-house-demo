<script>
	import { Cell } from '@smui/layout-grid';
	import List from '../../components/List.svelte';
	import { titleStore } from '../../stores/index.js';

	$titleStore = 'Sell'
</script>

<Cell span={12}>
	<List/>
</Cell>
