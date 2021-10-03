import { useContext } from "react";
import { I18nContext } from "../../contexts/I18nContext";

export default function useI18nContext() {
	return useContext(I18nContext);
}
