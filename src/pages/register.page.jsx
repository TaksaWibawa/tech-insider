/* eslint-disable react/no-unescaped-entities */
import { BaseLayout, GridLayout } from "@/layouts";
import { Box, Button, GridItem, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { SignUpForm } from "@/components/form/signup";
import { SignUpImage } from "@/components/icons";
import { useChangeDocTitle } from "@/hooks/useChangeDocTitle";

export default function RegisterPage() {
	useChangeDocTitle("Sign Up");

	return (
		<BaseLayout>
			<GridLayout
				templateColumns={{
					base: "1fr",
					lg: "1fr 1fr",
					xl: "1fr 1fr 0.5fr",
				}}
			>
				<GridItem
					colSpan={1}
					py={10}
				>
					<VStack spacing={5}>
						<Heading
							as="h1"
							size={"2xl"}
						>
							Sign Up
						</Heading>
						<Text
							textAlign={{ base: "center", lg: "left" }}
							fontSize={{ base: "md", lg: "lg" }}
							color={"#888888"}
						>
							Welcome to Tech Insider, please put your data below to start using
							this blog.
						</Text>
						<SignUpForm />
						<Text fontSize={{ base: "xs", lg: "md" }}>
							Already have an account?
							<Link to="/login">
								<Button
									color="blue.500"
									variant="link"
									fontSize={{ base: "xs", lg: "md" }}
									ml={1}
								>
									Sign In
								</Button>
							</Link>
						</Text>
					</VStack>
				</GridItem>
				<GridItem
					colSpan={{ base: 1, lg: 1, xl: 2 }}
					w={"full"}
					h={"full"}
					display={{ base: "none", lg: "flex" }}
					justifyContent={"center"}
					py={10}
					pl={{ base: 0, xl: 20 }}
				>
					<Box w={"full"}>
						<SignUpImage
							w={"full"}
							h={"auto"}
						/>
					</Box>
				</GridItem>
			</GridLayout>
		</BaseLayout>
	);
}
