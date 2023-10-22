/* eslint-disable react/prop-types */
import { Button } from "@chakra-ui/react";

export function ButtonBasic({ children, ...rest }) {
	return (
		<Button
			variant={"solid"}
			bgColor={"transparent"}
			color={"#828282"}
			py={5}
			px={6}
			rounded={"md"}
			fontSize={{ base: "sm", lg: "md" }}
			_hover={{
				bgColor: "transparent",
				color: "#000",
				textDecoration: "underline",
			}}
			{...rest}
		>
			{children}
		</Button>
	);
}

export function ButtonPrimary({ children, ...rest }) {
	return (
		<Button
			variant={"solid"}
			colorScheme="blue"
			border={"1px solid transparent"}
			py={5}
			px={6}
			rounded={"md"}
			fontSize={{ base: "sm", lg: "md" }}
			{...rest}
		>
			{children}
		</Button>
	);
}

export function ButtonOutlinePrimary({ children, ...rest }) {
	return (
		<Button
			variant={"outline"}
			colorScheme="blue"
			py={5}
			px={6}
			rounded={"md"}
			fontSize={{ base: "sm", lg: "md" }}
			{...rest}
		>
			{children}
		</Button>
	);
}
