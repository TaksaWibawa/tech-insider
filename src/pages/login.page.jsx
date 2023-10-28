/* eslint-disable react/no-unescaped-entities */
import { BaseLayout, GridLayout } from "../layouts";
import {
	AspectRatio,
	Box,
	Button,
	GridItem,
	Heading,
	Text,
	VStack,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { SignInForm } from "../components/form/signin";
import { SignInImage } from "../components/icons";
import { useChangeDocTitle } from "../hooks/useChangeDocTitle";

export default function LoginPage() {
	useChangeDocTitle("Sign In");

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
					margin={"auto"}
				>
					<VStack spacing={5}>
						<Heading
							as="h1"
							size={"2xl"}
						>
							Welcome Back
						</Heading>
						<Text
							textAlign={{ base: "center", lg: "left" }}
							fontSize={{ base: "md", lg: "lg" }}
							color={"#888888"}
						>
							Please input your data below to continue using our blog.
						</Text>
						<SignInForm />
						<Text fontSize={{ base: "xs", lg: "md" }}>
							Don't have an account?
							<NavLink to="/register">
								<Button
									color="blue.500"
									variant="link"
									fontSize={{ base: "xs", lg: "md" }}
									ml={1}
								>
									Sign Up
								</Button>
							</NavLink>
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
					<AspectRatio
						ratio={1 / 1}
						w={"full"}
					>
						<Box>
							<SignInImage
								w={"full"}
								h={"auto"}
							/>
						</Box>
					</AspectRatio>
				</GridItem>
			</GridLayout>
		</BaseLayout>
	);
}
