import { createContext, useState } from "react";
import he from '../lib/translations/he.json'

export const I18nContext = createContext();

export default function I18nProvider({ children }) {
	const [t, setT] = useState(he)

  return (
		<I18nContext.Provider value={{ t }}>
			<div dir='rtl'>{children}</div>
		</I18nContext.Provider>
	);
}
