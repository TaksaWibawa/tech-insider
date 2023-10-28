import { Box, Spinner } from "@chakra-ui/react";

export function LoadSpinner() {
	return (
		<Box
			w={"full"}
			h={"full"}
			gridColumn={"1 / -1"}
			gridRow={"1 / -1"}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			my={6}
		>
			<Spinner
				thickness="4px"
				speed="0.65s"
				emptyColor="gray.200"
				color="blue.500"
				size="xl"
			/>
		</Box>
	);
}
