import { Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

export function SearchBar({ ...props }) {
	return (
		<InputGroup
			maxW={{ base: "100%", lg: "2xl" }}
			{...props}
		>
			<InputLeftElement
				h={"full"}
				pointerEvents="none"
			>
				<Icon
					color={"gray.500"}
					boxSize={8}
					pos={"relative"}
					top={"0.25rem"}
					left={"0.375rem"}
				>
					<CiSearch />
				</Icon>
			</InputLeftElement>
			<Input
				type="text"
				w={"full"}
				h={"3rem"}
				borderColor={"gray.500"}
				paddingInlineStart={"2.5rem"}
				placeholder="Search Here"
				_placeholder={{
					color: "gray.400",
				}}
			/>
		</InputGroup>
	);
}
