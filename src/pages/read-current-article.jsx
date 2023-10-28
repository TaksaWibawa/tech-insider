import { ArticleSkeleton } from "../components/skeleton/article";
import {
	fetchArticle,
	selectArticle,
} from "../store/articles/fetchArticleById";
import { BaseLayout, FlexLayout } from "../layouts";
import { PreviewSection } from "../components/section/preview-section";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./not-found.page";
import { useChangeDocTitle } from "../hooks/useChangeDocTitle";

export default function ReadCurrentArticlePage() {

	const { articleId } = useParams();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchArticle(articleId));
	}, [dispatch, articleId]);

	const result = useSelector(selectArticle);
	useChangeDocTitle(result?.data?.title);


	return (
		<BaseLayout>
			<FlexLayout
				as={"article"}
				flexDir={"column"}
				justifyContent={"flex-start"}
				py={10}
			>
				{result.status === "loading" && <ArticleSkeleton />}

				{result.status === "success" && (
					<PreviewSection articleData={result.data} />
				)}

				{result.status === "failed" && <NotFoundPage />}
			</FlexLayout>
		</BaseLayout>
	);
}
