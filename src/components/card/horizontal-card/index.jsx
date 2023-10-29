/* eslint-disable react/prop-types */
import {
	AspectRatio,
	Badge,
	Button,
	ButtonGroup,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Text,
	VStack,
} from "@chakra-ui/react";

import { FaBookOpen, FaEdit, FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setArticleId } from "@/store/articles/deleteArticleById";
import { DeleteModal } from "@/components/modal/delete-modal";


export function HorizontalArticleCard({ articleData, onDelete }) {
	const { author, categories, content, created, thumbnailUrl, title } =
		articleData;
	const { displayName } = author;

	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleDeleteArticle = (id) => {
		dispatch(setArticleId(id));
		onDelete();
	};

	return (
		<Flex
			alignItems={"center"}
			borderRadius={"lg"}
			borderWidth={"1px"}
			flexDirection={"row"}
			mb={4}
			p={4}
			boxShadow={"md"}
			gap={4}
		>
			<AspectRatio
				ratio={16 / 9}
				flex="1"
				maxW={"200px"}
			>
				<Image
					src={thumbnailUrl || "https://via.placeholder.com/150"}
					alt={title}
					borderRadius="lg"
					style={{ objectFit: "contain" }}
				/>
			</AspectRatio>
			<VStack
				align="flex-start"
				flex={2}
				spacing={2}
			>
				<HStack spacing={2}>
					{categories?.map((category) => (
						<Badge
							key={category.value}
							colorScheme="blue"
							fontSize={"2xs"}
						>
							{category.label}
						</Badge>
					))}
				</HStack>
				<Heading
					color={"blue.500"}
					fontSize={"3xl"}
				>
					{title || "No title"}
				</Heading>
				<Text
					fontSize={"md"}
					color={"gray.800"}
					lineHeight={"1.5"}
					noOfLines={4}
				>
					{content || "No content"}
				</Text>
				<Text
					fontSize={"xs"}
					color={"gray.500"}
					lineHeight={"1.5"}
					noOfLines={1}
				>
					{created || "No date"} - By {displayName || "No author"}
				</Text>
			</VStack>

			<ButtonGroup alignSelf={"flex-end"}>
				{location.pathname === "/dashboard" ? (
					<>
						<Button
							leftIcon={<Icon as={FaEdit} />}
							size={"sm"}
							variant={"outline"}
							colorScheme={"blue"}
							onClick={() =>
								navigate("/dashboard/edit/article/" + articleData.id)
							}
						>
							Edit
						</Button>
						<Button
							leftIcon={<Icon as={FaTrash} />}
							size={"sm"}
							variant={"outline"}
							colorScheme={"red"}
							onClick={() => handleDeleteArticle(articleData.id)}
						>
							Delete
						</Button>
					</>
				) : (
					// temporary
					<Button
						leftIcon={<Icon as={FaBookOpen} />}
						size={"sm"}
						variant={"outline"}
						colorScheme={"blue"}
						onClick={() => navigate("/read/article/" + articleData.id)}
					>
						Read More
					</Button>
				)}
			</ButtonGroup>

			<DeleteModal data={articleData.id} />
		</Flex>
	);
}
