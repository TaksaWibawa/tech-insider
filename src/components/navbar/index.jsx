import {
	Avatar,
	Button,
	ButtonGroup,
	Container,
	Flex,
	HStack,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from "@chakra-ui/react";
import { BaseImage } from "../icons";
import { ButtonBasic, ButtonOutlinePrimary, ButtonPrimary } from "../button";
import { RiMenu2Line, RiArrowDropDownLine } from "react-icons/ri";
import { SearchBar } from "../search-bar";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export function Navbar() {
	const [isAuth, setIsAuth] = useState(false); // temporary

	const menuItems = [
		{
			label: "Dashboard",
			path: "/dashboard",
			_hover: {
				bgColor: "gray.100",
				color: "gray.800",
			},
		},
		{
			label: "Profile",
			path: "/dashboard/profile",
			_hover: {
				bgColor: "gray.100",
				color: "gray.800",
			},
		},
		{
			label: "Sign Out",
			path: "/logout",
			_hover: {
				bgColor: "red.500",
				color: "white",
			},
		},
	];

	return (
		<Container
			as="nav"
			maxW={"100%"}
			bg={"white"}
			borderBottom={"1px solid #E0E0E0"}
			pos={"sticky"}
			py={{ base: 5, lg: 7 }}
			px={{ base: 4, lg: 12 }}
			top={0}
			zIndex={999}
		>
			<HStack spacing={12}>
				<Flex
					justifyContent={{ base: "space-between", lg: "flex-start" }}
					gap={20}
					align={"center"}
					flex={{ base: "1 1 100%", lg: "1 1 50%" }}
					px={{ base: 2, md: 0 }}
				>
					<Button
						variant={"ghost"}
						display={{ base: "block", md: "none" }}
						w={"2rem"}
						paddingInline={0}
					>
						<Icon
							boxSize={6}
							color={"gray.800"}
							pos={"relative"}
							top={"0.20rem"}
							left={"0.20rem"}
						>
							<RiMenu2Line />
						</Icon>
					</Button>
					<BaseImage
						w={{ base: "100px", md: "150px" }}
						h={"auto"}
					/>
					<SearchBar display={{ base: "none", md: "block" }} />
				</Flex>

				<Flex
					justifyContent={"space-around"}
					align={"center"}
					display={{ base: "none", md: "flex" }}
				>
					<ButtonGroup gap={2}>
						<NavLink to="/">
							<ButtonBasic>Home</ButtonBasic>
						</NavLink>

						{!isAuth ? (
							<>
								<NavLink to="/login">
									<ButtonOutlinePrimary onClick={() => setIsAuth(!isAuth)}>
										Sign In
									</ButtonOutlinePrimary>
								</NavLink>
								<NavLink to="/register">
									<ButtonPrimary>Sign Up</ButtonPrimary>
								</NavLink>
							</>
						) : (
							<>
								<NavLink to="/write">
									<ButtonBasic>Write</ButtonBasic>
								</NavLink>
								<Menu>
									<MenuButton
										variant="unstyled"
										px={4}
									>
										<Avatar
											size={"sm"}
											src="https://bit.ly/dan-abramov"
										/>
										<Icon
											boxSize={7}
											pos={"relative"}
											top={"0.55rem"}
											left={"0rem"}
										>
											<RiArrowDropDownLine />
										</Icon>
									</MenuButton>
									<MenuList>
										{menuItems.map((item) => (
											<NavLink
												key={item.path}
												to={item.path}
											>
												<MenuItem _hover={item._hover}>{item.label}</MenuItem>
											</NavLink>
										))}
									</MenuList>
								</Menu>
							</>
						)}
					</ButtonGroup>
				</Flex>
			</HStack>
		</Container>
	);
}
