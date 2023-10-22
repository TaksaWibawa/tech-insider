/* eslint-disable react/no-unescaped-entities */
import { ButtonOutlinePrimary, ButtonPrimary } from "../../button";
import { Center, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import { GridLayout } from "../../../layouts";
import { HeroImage } from "../../icons";

export function HeroSection() {
	return (
		<GridLayout
			templateColumns={{
				base: "1fr",
				lg: "repeat(2, 1fr)",
			}}
			gap={4}
		>
			<VStack
				spacing={{ base: 4, lg: 8 }}
				my={"auto"}
				textAlign={{ base: "center", lg: "left" }}
			>
				<Flex
					flexDir={"column"}
					gap={5}
				>
					<Heading
						as={"h1"}
						color={"#3182CE"}
						fontSize={{ base: "2.25rem", sm: "3rem", lg: "3.25rem" }}
						lineHeight={{ base: "2.5rem", sm: "3.5rem", lg: "4rem" }}
					>
						Let's write and read our experience together!
					</Heading>
					<Text
						as={"p"}
						color={"#000000CC"}
						fontSize={{ base: "0.85rem", sm: "1rem", lg: "1.25rem" }}
						mx={{ base: 4, lg: 0 }}
					>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
						hendrerit enim nec libero luctus pellentesque. Donec cursus, velit
						ut aliquet aliquam, metus lorem auctor ipsum,
					</Text>
				</Flex>
				<Flex
					w={{ base: "80%", sm: "full" }}
					gap={{ base: 2, lg: 4 }}
					justify={{ base: "center", lg: "flex-start" }}
					flexDir={{ base: "column", sm: "row" }}
				>
					<ButtonPrimary>Write Article</ButtonPrimary>
					<ButtonOutlinePrimary>Read Article</ButtonOutlinePrimary>
				</Flex>
			</VStack>

			<Center
				display={{
					base: "none",
					lg: "flex",
				}}
			>
				<HeroImage width={"70%"} />
			</Center>
		</GridLayout>
	);
}
