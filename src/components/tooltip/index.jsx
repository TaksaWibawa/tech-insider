/* eslint-disable react/prop-types */
import { Tooltip } from "@chakra-ui/react";

export function ErrorTooltip({ error, children, ...rest }) {
	return (
		<Tooltip
			aria-label="A tooltip"
			bgColor="red.500"
			color="white"
			hasArrow
			label={error?.message}
			placement="top-start"
			visibility={error ? "visible" : "hidden"}
			{...rest}
		>
			{children}
		</Tooltip>
	);
}
