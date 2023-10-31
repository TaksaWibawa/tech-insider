import { useEffect } from "react";

export function useChangeDocTitle(title) {
	useEffect(() => {
		document.title = title;
		return () => {
			document.title = "TechInsider";
		};
	}, [title]);
}
