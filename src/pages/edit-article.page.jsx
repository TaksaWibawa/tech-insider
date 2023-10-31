import { Alert, ButtonGroup } from "@chakra-ui/react";
import { ButtonOutlinePrimary, ButtonPrimary } from "@/components/button";
import { DashboardHeader } from "@/components/navbar/dashboard";
import { fetchArticle, selectArticle } from "@/store/articles/fetchArticleById";
import { FlexLayout } from "@/layouts";
import { PreviewSection } from "@/components/section/preview-section";
import { useChangeDocTitle } from "@/hooks/useChangeDocTitle";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	getUpdateArticleById,
	setUpdatedData,
	toggleEditPreview,
	updateArticleById,
} from "@/store/articles/updateArticleById";
import { EditForm } from "@/components/form/edit-article";
import { LoadSpinner } from "@/components/spinner";

export default function EditArticlePage() {
	useChangeDocTitle("Edit Your Article");
	const articleId = useParams().articleId;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { status: fetchStatus, data: initialData } = useSelector(selectArticle);
	const {
		isPreview,
		status: statusUpdate,
		data: updatedData,
	} = useSelector(getUpdateArticleById);

	useEffect(() => {
		dispatch(fetchArticle(articleId));
	}, [dispatch, articleId]);

	useEffect(() => {
		dispatch(setUpdatedData(initialData));
	}, [dispatch, initialData]);

	const handlePreview = () => {
		dispatch(toggleEditPreview());
	};

	const handleUpdateArticle = (updatedData) => {
		dispatch(updateArticleById({ articleId, updatedData }));
		navigate("/dashboard");
	};

	return (
		<>
			<DashboardHeader title="Edit Article" />
			<FlexLayout
				as="section"
				flexDir={"column"}
				justifyContent={"flex-start"}
				py={10}
			>
				{fetchStatus === "success" && (
					<>
						{statusUpdate === "error" && (
							<Alert status="error">Failed to update article</Alert>
						)}

						{statusUpdate === "loading" && <LoadSpinner />}

						<ButtonGroup
							display="flex"
							justifyContent="flex-end"
						>
							<ButtonPrimary
								size="sm"
								type="submit"
								onClick={() => navigate(-1)}
							>
								Go Back
							</ButtonPrimary>
							<ButtonOutlinePrimary
								size="sm"
								type="button"
								onClick={() => handlePreview()}
							>
								{isPreview ? "Edit" : "Preview"}
							</ButtonOutlinePrimary>
						</ButtonGroup>

						{isPreview ? (
							<PreviewSection articleData={updatedData} />
						) : (
							<EditForm
								initialData={updatedData}
								onSubmit={handleUpdateArticle}
							/>
						)}
					</>
				)}

				{fetchStatus === "loading" && <LoadSpinner />}

				{fetchStatus === "error" && (
					<Alert status="error">Failed to fetch article</Alert>
				)}
			</FlexLayout>
		</>
	);
}
