import { ArticleCard } from "../components/card";
import { fetchArticles, getArticles } from "../store/articles/fetchArticles";
import { GridLayout } from "../layouts";
import { LoadSpinner } from "../components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function ReadArticlesPage() {
	const dispatch = useDispatch();
	const result = useSelector(getArticles);

	const { status, data: articles } = result;

	useEffect(() => {
		dispatch(fetchArticles());
	}, [dispatch]);

	return (
		<GridLayout
			gridTemplateColumns={{
				base: "repeat(1, 1fr)",
				md: "repeat(2, 1fr)",
				lg: "repeat(3, 1fr)",
			}}
			gridGap={6}
			py={6}
		>
			{status === "loading" && <LoadSpinner />}

			{status === "success" &&
				articles.map((article) => (
					<ArticleCard
						key={article.id}
						articleData={article}
					/>
				))}
		</GridLayout>
	);
}
