/* eslint-disable react/no-unescaped-entities */
import { GridLayout } from "../layouts";
import { Box, Button, GridItem, Heading, Text, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { SignInForm } from "../components/form/signin";
import { SignInImage } from "../components/icons";

export default function LoginPage() {
	return (
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
						<NavLink to="/login">
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
				<Box>
					<SignInImage
						w={"full"}
						h={"auto"}
					/>
				</Box>
			</GridItem>
		</GridLayout>
	);
}
