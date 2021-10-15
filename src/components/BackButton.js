import { Button } from "@mui/material";
import { useHistory } from "react-router";
import useI18nContext from "../hooks/general/useI18nContext";
import { BiChevronRight } from "react-icons/bi";

export default function BackButton({...rest}) {
	const { t } = useI18nContext();
	const { goBack } = useHistory();

	return (
		<Button startIcon={<BiChevronRight size={24} />} onClick={goBack} {...rest}>
			{t?.back}
		</Button>
	);
}
