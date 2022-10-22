<script>
	let tokens = [
		{
			title: `Sign 'o' the times`,
			artist: 'Prince',
			year: '1987',
			price: 50,
			art: 'https://i.discogs.com/tmb19P9zyKfJ5IY2U_u3KCgTpmOzC5u4O9s4KXW3jCY/rs:fit/g:sm/q:90/h:494/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3MDM3/MTItMTIzODA0MzAx/MC5qcGVn.jpeg'
		},
		{
			title: 'Overpowered',
			artist: 'Róisín Murphy',
			year: '2008',
			price: 25,
			art: 'https://i.discogs.com/ovafvNfmn91R5zf0rsAMnxrTBk2uojlsEtnI8eYLR5Q/rs:fit/g:sm/q:90/h:595/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMTc2/MDItMTMyOTUxMjk5/NS5qcGVn.jpeg'
		},
		{
			title: 'The Bends',
			artist: 'Radiohead',
			year: '1995',
			price: 30,
			art: 'https://i.discogs.com/gI1zT1tRMis1pAp9VJy0JyxJEYBoOQn4-uMT5sAPNUc/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2Mjk5/MjEtMTU1OTEyOTQ2/MS04NjIyLmpwZWc.jpeg'
		},
		{
			title: `Sign 'o' the times`,
			artist: 'Prince',
			year: '1987',
			price: 50,
			art: 'https://i.discogs.com/tmb19P9zyKfJ5IY2U_u3KCgTpmOzC5u4O9s4KXW3jCY/rs:fit/g:sm/q:90/h:494/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3MDM3/MTItMTIzODA0MzAx/MC5qcGVn.jpeg'
		},
		{
			title: 'Overpowered',
			artist: 'Róisín Murphy',
			year: '2008',
			price: 25,
			art: 'https://i.discogs.com/ovafvNfmn91R5zf0rsAMnxrTBk2uojlsEtnI8eYLR5Q/rs:fit/g:sm/q:90/h:595/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExMTc2/MDItMTMyOTUxMjk5/NS5qcGVn.jpeg'
		},
		{
			title: 'The Bends',
			artist: 'Radiohead',
			year: '1995',
			price: 30,
			art: 'https://i.discogs.com/gI1zT1tRMis1pAp9VJy0JyxJEYBoOQn4-uMT5sAPNUc/rs:fit/g:sm/q:90/h:591/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTU2Mjk5/MjEtMTU1OTEyOTQ2/MS04NjIyLmpwZWc.jpeg'
		}
	];
</script>

<div class='flex justify-between flex-wrap m-auto p-2'>
	{#each tokens as token}
		<div class='p-2'>
			<img
				class='art object-cover rounded-xl'
				src={token.art}
				alt="Cover art for '{token.title}'"
			>
			<div>
				<h3 class='text-xl font-bold'>{token.title} ({token.year})</h3>
				<h4 class='text-lg'>{token.artist}</h4>
			</div>
			<div>
				<p class='flex items-center'>
					<img alt='Solana logo' src='solanaLogoMark.svg' class='h-3.5 pr-2'>
					<span>{token.price}</span>
				</p>
				<button class='transition-colors rounded hover:bg-solana-green p-2 bg-solana-purple text-white'>Buy</button>
				<button class='border rounded p-2'>Bid</button>
			</div>
		</div>
	{/each}
</div>

<style>
    .art {
        width: 300px;
        height: 300px;
    }
</style>
