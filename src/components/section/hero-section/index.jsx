/* eslint-disable react/no-unescaped-entities */
import { ButtonOutlinePrimary, ButtonPrimary } from "@/components/button";
import { Center, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import { GridLayout } from "@/layouts";
import { HeroImage } from "@/components/icons";
import { useNavigate } from "react-router";

export function HeroSection() {
	const navigate = useNavigate();

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
						fontSize={{ base: "0.75rem", lg: "1.15rem" }}
						mx={{ base: 4, lg: 0 }}
					>
						Welcome to Tech Insider, your go-to blog for the latest in tech and
						innovation. Dive into insightful articles and reviews covering
						gadgets, scientific breakthroughs, and more. Whether you're a tech
						enthusiast or just curious, stay ahead with us in the dynamic world
						of technology. Welcome to the forefront of innovation – welcome to
						Tech Insider.
					</Text>
				</Flex>
				<Flex
					w={{ base: "80%", sm: "full" }}
					gap={{ base: 2, lg: 4 }}
					justify={{ base: "center", lg: "flex-start" }}
					flexDir={{ base: "column", sm: "row" }}
				>
					<ButtonPrimary
						onClick={() => navigate("/write")}
						w={{ base: "full", sm: "auto" }}
					>
						Write Article
					</ButtonPrimary>
					<ButtonOutlinePrimary
						onClick={() => navigate("/read")}
						w={{ base: "full", sm: "auto" }}
					>
						Read Article
					</ButtonOutlinePrimary>
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
