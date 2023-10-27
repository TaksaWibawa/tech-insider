/* eslint-disable react/prop-types */
import {
	AspectRatio,
	Avatar,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Image,
	Square,
	Text,
	VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function ArticleCard({ articleData }) {
	const { id, author, categories, content, created, thumbnailUrl, title } =
		articleData;
	const { photoURL, displayName } = author;

	return (
		<Card>
			<CardHeader
				pb={2}
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				gap={3}
			>
				<AspectRatio ratio={16 / 9}>
					<Image
						src={thumbnailUrl || "https://bit.ly/sage-adebayo"}
						alt={title || "No title"}
						style={{ objectFit: "contain" }}
					/>
				</AspectRatio>
				<Flex
					direction="row"
					flexWrap="wrap"
					justifyContent="flex-start"
					alignItems="center"
					gap={2}
				>
					{categories?.map((category) => (
						<Square
							key={category.value}
							border={"1px solid #000000CC"}
							borderRadius="lg"
							padding={"3px 7px"}
						>
							<Text
								fontSize={"xs"}
								fontWeight={"semibold"}
							>
								{category.label || "No category"}
							</Text>
						</Square>
					))}
				</Flex>
				<Heading
					color={"#3182CE"}
					fontSize={"2xl"}
					lineHeight={"1.5"}
				>
					{title || "No title"}
				</Heading>
			</CardHeader>
			<CardBody
				py={0}
				overflow={"hidden"}
			>
				<Text
					fontSize={"sm"}
					color={"#0000007C"}
					lineHeight={"1.5"}
					noOfLines={4}
				>
					{content || "No content"}
				</Text>
			</CardBody>
			<CardFooter
				pt={6}
				alignItems={"center"}
			>
				<Avatar
					size="sm"
					name={displayName}
					src={photoURL || "bit.ly/dan-abramov"}
				/>
				<VStack
					alignItems={"flex-start"}
					justifyContent={"flex-start"}
					spacing={0}
					ml={2}
				>
					<Text
						fontSize={"xs"}
						color={"#000000CC"}
						fontWeight={"semibold"}
					>
						{displayName || "No name"}
					</Text>
					<Text
						fontSize={"0.625rem"}
						color={"#000000CC"}
					>
						{created || "No date"}
					</Text>
				</VStack>
				<Link
					to={`/read/article/${id}`}
					style={{ marginLeft: "auto" }}
				>
					<Button
						colorScheme="blue"
						size="sm"
						variant="outline"
					>
						Read more
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
}
