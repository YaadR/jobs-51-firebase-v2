export default function getUsersCSV(data, t, users) {
	let dataArr = [];
	data?.forEach((user) =>
		dataArr.push([
			users?.find((u) => u?.id === user?.uid)?.displayName,
			user?.region,
			user?.type,
			user?.description,
			user?.total,
			user?.approved ? t?.approved : t?.pending,
			user?.date,
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