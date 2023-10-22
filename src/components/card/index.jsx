/* eslint-disable react/prop-types */
import {
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

export function ArticleCard({
	articleData,
	articleId,
	categories,
	content,
	date,
	thumbnail,
	title,
}) {
	return (
		<Card>
			<CardHeader
				pb={2}
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
				gap={3}
			>
				<Image
					src={thumbnail}
					alt="Green double couch with wooden legs"
					borderRadius="lg"
				/>
				<Flex
					direction="row"
					flexWrap="wrap"
					justifyContent="flex-start"
					alignItems="center"
					gap={2}
				>
					{categories.map((category) => (
						<Square
							key={category}
							border={"1px solid #000000CC"}
							borderRadius="lg"
							padding={"3px 7px"}
						>
							<Text
								fontSize={"xs"}
								fontWeight={"semibold"}
							>
								{category}
							</Text>
						</Square>
					))}
				</Flex>
				<Heading
					color={"#3182CE"}
					fontSize={"2xl"}
					lineHeight={"1.5"}
				>
					{title}
				</Heading>
			</CardHeader>
			<CardBody py={0}>
				<Text
					fontSize={"sm"}
					color={"#0000007C"}
					lineHeight={"1.5"}
				>
					{content}
				</Text>
			</CardBody>
			<CardFooter
				pt={6}
				alignItems={"center"}
			>
				<Avatar
					size="sm"
					name="Dan Abrahmov"
					src={articleData.avatar}
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
						{articleData.name}
					</Text>
					<Text
						fontSize={"0.625rem"}
						color={"#000000CC"}
					>
						{date}
					</Text>
				</VStack>
				<Link
					to={`/articles/${articleId}`}
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
