<script>
	import { titleStore } from '../../stores/index.js';
	import { Column, ImageLoader, Row, SelectableTile, SkeletonPlaceholder } from 'carbon-components-svelte';

	$titleStore = 'Gallery';

	let tokens = [
		{
			title: `Sign 'o' the times`,
			artist: 'Prince',
			year: '1987',
			art: 'https://i.discogs.com/tmb19P9zyKfJ5IY2U_u3KCgTpmOzC5u4O9s4KXW3jCY/rs:fit/g:sm/q:90/h:494/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3MDM3/MTItMTIzODA0MzAx/MC5qcGVn.jpeg'
		},
		{
			title: 'Overpowered',
			artist: 'Róisín Murphy',
			year: '2008',
			art: 'https://i.discogs.com/ovafvNfmn91R5zf0rsAMnxrTBk2uojlsEtnI8eYLR5Q/rs:fit/g:sm/q:90/h:595/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMTc2/MDItMTMyOTUxMjk5/NS5qcGVn.jpeg'
		},
		{
			title: 'The Bends',
			artist: 'Radiohead',
			year: '1995',
			art: 'https://i.discogs.com/gI1zT1tRMis1pAp9VJy0JyxJEYBoOQn4-uMT5sAPNUc/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2Mjk5/MjEtMTU1OTEyOTQ2/MS04NjIyLmpwZWc.jpeg'
		}
	];
</script>

<Row>
	{#each tokens as { title, artist, year, art: src }}
		<Column>
			<div class='square'>
				<SelectableTile disabled={true} style='width: 100%'>
					{title} ({year})
					<ImageLoader {src}>
						<svelte:fragment slot='loading'>
							<SkeletonPlaceholder></SkeletonPlaceholder>
						</svelte:fragment>
					</ImageLoader>
				</SelectableTile>
			</div>
		</Column>
	{/each}
</Row>

<style global>
    .square {
        aspect-ratio: 1/1;
        display: flex;
    }
    .square img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
    }
</style>
