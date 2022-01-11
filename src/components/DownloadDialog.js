import { useEffect, useState } from "react";
import useI18nContext from "../hooks/general/useI18nContext";
import Dialog from "./Dialog";
import { CSVLink } from "react-csv";
import { Button, CircularProgress } from "@mui/material";

export default function DownloadDialog({
	open,
	onClose,
	formatterFunction,
	data,
}) {
	const { t } = useI18nContext();
	const [csvData, setCsvData] = useState(null);

	useEffect(() => {
		if (data?.length > 0) {
			formatterFunction(data, t).then((d) => setCsvData(d));
		}
	}, [data, formatterFunction, t]);

	return (
		<Dialog
			maxWidth='xs'
			fullWidth
			title={t?.download}
			open={open}
			onClose={onClose}
		>
			<Button fullWidth color='primary' variant='contained'>
				{!csvData ? (
					<CircularProgress color='inherit' size={26} />
				) : (
					<CSVLink filename='users-list' data={csvData}>
						{t?.download}
					</CSVLink>
				)}
			</Button>
		</Dialog>
	);
}
