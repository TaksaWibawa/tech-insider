/* eslint-disable react/prop-types */
import { Container, Grid, Flex } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export function BaseLayout({ children, ...rest }) {
	return (
		<Container
			as="main"
			maxW={"full"}
			p={0}
			{...rest}
		>
			<Navbar />
			{children}
			<Footer />
		</Container>
	);
}

export function ContainerLayout({ children, ...rest }) {
	return (
		<Container
			as="section"
			maxW={"full"}
			px={{ base: 4, lg: 12 }}
			py={0}
			{...rest}
		>
			{children}
		</Container>
	);
}

export function GridLayout({ children, ...rest }) {
	return (
		<ContainerLayout>
			<Grid
				minH={"100vh"}
				gap={6}
				{...rest}
			>
				{children}
			</Grid>
		</ContainerLayout>
	);
}

export function FlexLayout({ children, ...rest }) {
	return (
		<ContainerLayout>
			<Flex
				minH={"100vh"}
				gap={6}
				{...rest}
			>
				{children}
			</Flex>
		</ContainerLayout>
	);
}
