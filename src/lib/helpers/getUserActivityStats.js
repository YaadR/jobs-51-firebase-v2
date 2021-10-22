export default function getUserActivityStats(userActivities) {
	const approvedArr = userActivities?.filter((v) => v?.approved);
	const pendingArr = userActivities?.filter((v) => !v?.approved);

	const pending =
		pendingArr?.length > 0
			? pendingArr?.reduce((a, b) => Number(a) + Number(b?.total), 0)
			: 0;
	const approved =
		approvedArr?.length > 0
			? approvedArr?.reduce((a, b) => Number(a) + Number(b?.total), 0)
			: 0;

	return [
		{ label: 'approved', value: approved },
		{ label: 'pending', value: pending },
	];
}
