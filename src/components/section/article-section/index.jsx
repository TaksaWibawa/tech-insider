import { Heading } from "@chakra-ui/react";
import { FlexLayout } from "../../../layouts";
import { Pagination } from "../../pagination";
import { ArticleCard } from "../../card";

export function ArticleSection() {
	const cardData = [
		{
			id: 1,
			title: "Building a React Component Library with Chakra UI",
			thumbnail:
				"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
			categories: ["Programming", "Product"],
			content:
				"Some quick example text to build on the card title and make up the bulk of the card's content.  make up the bulk of the card's content.",
			date: "Sep 08, 2021",
			authorData: {
				name: "John Doe",
				avatar: "https://bit.ly/dan-abramov",
			},
		},
		{
			id: 2,
			title: "Building a React Component Library with Chakra UI",
			thumbnail:
				"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
			categories: ["Programming", "Product"],
			content:
				"Some quick example text to build on the card title and make up the bulk of the card's content.  make up the bulk of the card's content.",
			date: "Sep 08, 2021",
			authorData: {
				name: "John Doe",
				avatar: "https://bit.ly/dan-abramov",
			},
		},
		{
			id: 3,
			title: "Building a React Component Library with Chakra UI",
			thumbnail:
				"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
			categories: ["Programming", "Product"],
			content:
				"Some quick example text to build on the card title and make up the bulk of the card's content.  make up the bulk of the card's content.",
			date: "Sep 08, 2021",
			authorData: {
				name: "John Doe",
				avatar: "https://bit.ly/dan-abramov",
			},
		},
	];

	return (
		<FlexLayout
			flexDir={"column"}
			py={6}
			justifyContent={"space-evenly"}
		>
			<Heading
				as={"h2"}
				color={"#000000CC"}
				fontSize={{ base: "2.25rem", sm: "2.5rem", lg: "2.75rem" }}
			>
				List of Articles
			</Heading>
			<Pagination
				data={cardData}
				itemsPerPage={4}
				renderItem={(item) => (
					<ArticleCard
						key={item.id}
						articleData={item.authorData}
						articleId={item.id}
						categories={item.categories}
						content={item.content}
						date={item.date}
						thumbnail={item.thumbnail}
						title={item.title}
					/>
				)}
			/>
		</FlexLayout>
	);
}
