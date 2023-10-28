import { Box, Heading, Center } from "@chakra-ui/react";
import { FaLock } from "react-icons/fa";
import { ButtonPrimary } from "../components/button";
import { useNavigate } from "react-router";
import { useChangeDocTitle } from "../hooks/useChangeDocTitle";

export default function UnauthorizedPage() {
	useChangeDocTitle("Unauthorized (401)");

	const navigate = useNavigate();

	return (
		<Center
			h="100vh"
			px={10}
		>
			<Box
				p={8}
				borderWidth={1}
				borderRadius={10}
				boxShadow="lg"
				textAlign="center"
				boxSize={"sm"}
				alignItems={"center"}
				justifyContent={"center"}
				display={"flex"}
				flexDirection={"column"}
			>
				<Center>
					<FaLock
						size={90}
						color="#ff0000"
					/>
				</Center>
				<Heading
					fontSize="3xl"
					mt={4}
					fontWeight="bold"
				>
					Unauthorized (401)
				</Heading>
				<ButtonPrimary
					mt={4}
					onClick={() => navigate(-1)}
				>
					Go Back
				</ButtonPrimary>
			</Box>
		</Center>
	);
}
