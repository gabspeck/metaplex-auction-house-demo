export async function get() {
	return {
		headers: { Location: '/success' },
		status: 302
	};
}
