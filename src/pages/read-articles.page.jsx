/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { fetchArticles, getArticles } from "../store/articles/fetchArticles";
import { useCallback, useEffect, useState } from "react";
import { useObserver } from "../hooks/useObserver";
import { BaseLayout, ContainerLayout } from "../layouts";
import { Grid, Text } from "@chakra-ui/layout";
import { LoadSpinner } from "../components/spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { HorizontalArticleCard } from "../components/card/horizontal-card";
import { useChangeDocTitle } from "../hooks/useChangeDocTitle";

export default function ReadArticlesPage() {
	useChangeDocTitle("Read Articles");

	const dispatch = useDispatch();
	const result = useSelector(getArticles);

	const { status, data: articles } = result;

	const [hasMore, setHasMore] = useState(true);
	const [loadedCount, setLoadedCount] = useState(4);

	// find a way to effectively limit the fetched data
	useEffect(() => {
		dispatch(fetchArticles());
	}, [dispatch]);

	const endOfPageRef = useObserver(
		(entries) => {
			const target = entries[0];
			if (target.isIntersecting) {
				loadMoreArticles();
			}
		},
		{ threshold: 0.5 }
	);

	const loadMoreArticles = useCallback(() => {
		const articlesToLoad = 4;
		const remainingArticles = articles.length - loadedCount;
		const articlesToLoadNow = Math.min(articlesToLoad, remainingArticles);

		if (articlesToLoadNow <= 0) {
			setHasMore(false);
		} else {
			setLoadedCount(loadedCount + articlesToLoadNow);
		}
	}, [loadedCount, articles]);

	return (
		<BaseLayout>
			<ContainerLayout
				as="section"
				py={6}
			>
				{status === "loading" && <LoadSpinner />}

				{status === "success" && (
					<InfiniteScroll
						dataLength={loadedCount}
						next={loadMoreArticles}
						hasMore={hasMore}
						loader={<LoadSpinner />}
						endMessage={
							<Text
								textAlign="center"
								color="#000000CC"
								fontSize={{ base: "0.875rem", sm: "1rem", lg: "1.125rem" }}
								fontWeight={"semibold"}
								my={6}
							>
								No more articles
							</Text>
						}
					>
						<Grid
							templateColumns={"repeat(1, 1fr)"}
							gap={6}
							justifyContent="center"
						>
							{articles.slice(0, loadedCount).map((article) => {
								return (
									<HorizontalArticleCard
										key={article.id}
										articleData={article}
									/>
								);
							})}
						</Grid>
					</InfiniteScroll>
				)}

				{status === "failed" && (
					<Text
						textAlign="center"
						color="#000000CC"
						fontSize={{ base: "0.875rem", sm: "1rem", lg: "1.125rem" }}
						fontWeight={"semibold"}
						my={6}
					>
						{result.message}
					</Text>
				)}

				<div ref={endOfPageRef} />
			</ContainerLayout>
		</BaseLayout>
	);
}
