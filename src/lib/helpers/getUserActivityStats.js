export default function getUserActivityStats(userActivities, t) {
	const approvedArr = userActivities?.filter((v) => v?.approved);
	const pendingArr = userActivities?.filter((v) => !v?.approved);

	const pending =
		pendingArr?.length > 0
			? pendingArr?.reduce((a, b) => parseInt(a) + parseInt(b?.total), 0)
			: 0;
	const approved =
		approvedArr?.length > 0
			? approvedArr?.reduce((a, b) => parseInt(a) + parseInt(b?.total), 0)
			: 0;

	return [
		{ label: t?.approved, value: approved },
		{ label: t?.pending, value: pending },
	];
}
