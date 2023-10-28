import { Box, Heading, Center } from "@chakra-ui/react";
import { FaExclamationCircle } from "react-icons/fa";
import { ButtonPrimary } from "../components/button";
import { useNavigate } from "react-router";
import { useChangeDocTitle } from "../hooks/useChangeDocTitle";

export default function NotFoundPage() {
	useChangeDocTitle("Page Not Found (404)");

	const navigate = useNavigate();

	return (
		<Center
			h="100vh"
			px={10}
		>
			<Box
				alignItems={"center"}
				borderRadius={10}
				borderWidth={1}
				boxShadow="lg"
				boxSize={"sm"}
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				textAlign="center"
			>
				<Center>
					<FaExclamationCircle
						size={90}
						color="#ff0000"
					/>
				</Center>
				<Heading
					fontSize="3xl"
					mt={4}
					fontWeight="bold"
				>
					Not Found (404)
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
