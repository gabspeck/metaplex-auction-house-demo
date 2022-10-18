import { MusicBrainzApi } from 'musicbrainz-api';

export async function GET() {
	const mbApi = new MusicBrainzApi({
		appName: 'Auction House Demo',
		appVersion: '0.0.1',
		appContactInfo: 'gabriels@hey.com'
	});

	// const artists = await mbApi.searchArtist({query: 'Gal Costa'})
	// console.log({artists: artists.artists})

	try {
		const response = await mbApi.browseReleases({
			artist: 'fc63a914-272d-4b95-9221-61adcce6f793',
			limit: 10,
		})
		mbApi.restGet('')

		return new Response(
			JSON.stringify(
				response.releases.map(r => ({
				title: r.title,
				year: r.date.split('-')[0],
				artist: 'Gal Costa'
			})),
				undefined,
				2
			)
		);
	} catch (e){
		return new Response(e.message)
	}
}
