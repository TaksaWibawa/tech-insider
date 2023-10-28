/* eslint-disable react/prop-types */
import { Container, Flex, HStack, Heading } from "@chakra-ui/react";

export function DashboardHeader({ title }) {
	return (
		<Container
			as="nav"
			bg={"white"}
			borderBottom={"1px solid #E0E0E0"}
			maxW={"100%"}
			pos={"sticky"}
			px={12}
			py={6}
			top={0}
			zIndex={1000}
		>
			<HStack spacing={12}>
				<Flex align={"center"}>
					<Heading
						color={"gray.700"}
						fontWeight={"bold"}
						letterSpacing={"tight"}
						size={"lg"}
					>
						{title}
					</Heading>
				</Flex>
			</HStack>
		</Container>
	);
}
