export default function getActivitiesCSV(data, t, users) {
	let dataArr = [];
	data?.forEach((activity) =>
		dataArr.push([
			users?.find((u) => u?.id === activity?.uid)?.displayName,
			activity?.region,
			activity?.type,
			activity?.description,
			activity?.total,
			activity?.approved ? t?.approved : t?.pending,
			activity?.date,
		])
	);

	return [
		[
			t?.username,
			t?.region,
			t?.type,
			t?.description,
			t?.totalHours,
			t?.approved,
			t?.date,
		],
		...dataArr,
	];
}
