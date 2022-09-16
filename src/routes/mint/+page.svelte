<script>
	import Mint from '../../components/Mint.svelte';
	import { Cell } from '@smui/layout-grid';
	import { titleStore } from '../../stores/index.js';

	$titleStore = 'Mint'
</script>

<Cell span={12}>
	<Mint/>
</Cell>
