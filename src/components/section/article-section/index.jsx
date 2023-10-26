import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchArticles,
	getArticles,
} from "../../../store/articles/fetchArticles";
import { ArticleCard } from "../../card";
import { FlexLayout } from "../../../layouts";
import { Heading } from "@chakra-ui/react";
import { LoadSpinner } from "../../spinner";
import { Pagination } from "../../pagination";

export function ArticleSection() {
	const dispatch = useDispatch();
	const result = useSelector(getArticles);

	const { status, data: articles } = result;

	useEffect(() => {
		dispatch(fetchArticles());
	}, [dispatch]);

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
				textAlign={{ base: "center", lg: "left" }}
			>
				List of Articles
			</Heading>

			{status === "success" && (
				<Pagination
					data={articles}
					itemsPerPage={6}
					renderItem={(article) => (
						<ArticleCard
							key={article.id}
							articleData={article}
						/>
					)}
				/>
			)}

			{status === "loading" && <LoadSpinner />}
		</FlexLayout>
	);
}
