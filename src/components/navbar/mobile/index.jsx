/* eslint-disable react/prop-types */
import {
	Avatar,
	Button,
	Divider,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Link,
	Text,
} from "@chakra-ui/react";
import {
	menuItemsMobile,
	menuItemsAnonymous,
} from "../../../constant/menuItems";
import { NavLink, useLocation } from "react-router-dom";
import { authService } from "../../../config/auth";
import { useEffect } from "react";

export function MobileNavbar({ isOpen, onClose, isAuth }) {
	const location = useLocation();

	const isPathActive = (path) => {
		return location.pathname === path;
	};

	useEffect(() => {
		return () => {
			onClose();
		};
	}, [location.pathname, onClose]);

	return (
		<Drawer
			isOpen={isOpen}
			placement="left"
			onClose={onClose}
			size={{ base: "full", md: "sm" }}
		>
			<DrawerOverlay bgColor={"rgba(0,0,0,0.5)"} />

			<DrawerContent>
				<DrawerCloseButton />

				<DrawerHeader>
					<Flex
						justifyContent={"flex-start"}
						alignItems={"center"}
						w={"full"}
					>
						<Avatar
							size={"sm"}
							src={
								!isAuth
									? "https://bit.ly/broken-link"
									: "https://bit.ly/dan-abramov"
							}
						/>
						<Flex
							flexDirection={"column"}
							justifyContent={"flex-start"}
							alignItems={"flex-start"}
							ml={4}
						>
							<Text
								fontSize={"md"}
								fontWeight={"semibold"}
							>
								{isAuth ? "John Doe" : "Guest"}
							</Text>
						</Flex>
					</Flex>
				</DrawerHeader>

				<Divider
					orientation="horizontal"
					w={"full"}
					borderColor={"gray.400"}
				/>

				<DrawerBody
					p={4}
					display={"flex"}
					flexDirection={"column"}
					gap={2}
				>
					{!isAuth ? (
						<>
							{menuItemsAnonymous.map((item) => (
								<NavLink
									key={item.label}
									to={item.path}
								>
									<Button
										w={"full"}
										variant="ghost"
										justifyContent={"flex-start"}
										_hover={item._hover}
										isActive={
											item.label === "Sign Out"
												? false
												: isPathActive(item.path)
										}
										_active={{
											color: "white",
											bgColor: "blue.500",
										}}
									>
										{item.label}
									</Button>
								</NavLink>
							))}
						</>
					) : (
						<>
							{menuItemsMobile.map((item) => (
								<Link
									as={NavLink}
									key={item.label}
									to={item.path}
									onClick={item.onClick}
								>
									<Button
										w={"full"}
										variant="ghost"
										justifyContent={"flex-start"}
										_hover={item._hover}
										onClick={item.onClick}
										isActive={
											item.label === "Sign Out"
												? false
												: isPathActive(item.path)
										}
										_active={{
											color: "white",
											bgColor: "blue.500",
										}}
									>
										{item.label}
									</Button>
								</Link>
							))}
						</>
					)}
				</DrawerBody>

				<Divider
					orientation="horizontal"
					w={"full"}
					borderColor={"gray.400"}
				/>

				<DrawerFooter>
					{isAuth ? (
						<Button
							w={"full"}
							variant="outline"
							colorScheme="red"
							_hover={{ bgColor: "red.500", color: "white" }}
							onClick={authService.logOut()}
						>
							Sign Out
						</Button>
					) : (
						<Text
							fontSize={"md"}
							fontWeight={"semibold"}
							mx={"auto"}
							textDecoration={"underline"}
						>
							Please sign in to continue.
						</Text>
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
