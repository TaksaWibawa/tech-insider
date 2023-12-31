/* eslint-disable react/prop-types */
import { Container, Grid, Flex } from "@chakra-ui/react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

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
				px={"20px"}
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
				px={"20px"}
				{...rest}
			>
				{children}
			</Flex>
		</ContainerLayout>
	);
}
