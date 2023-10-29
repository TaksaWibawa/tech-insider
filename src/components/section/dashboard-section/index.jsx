import { Container, Heading, HStack } from "@chakra-ui/layout";
import { currentUser } from "@/store/users/manageUser";
import {
	deleteArticleById,
	getDeleteArticleById,
	resetStatusDeleteArticle,
} from "@/store/articles/deleteArticleById";
import { DeleteModal } from "@/components/modal/delete-modal";
import {
	fetchArticleByAuthor,
	selectArticleByAuthor,
} from "@/store/articles/fetchArticleByAuthor";
import { getModal, resetModal, toggleModal } from "@/store/modal";
import { HorizontalArticleCard } from "@/components/card/horizontal-card";
import { LoadSpinner } from "@/components/spinner";
import { Pagination } from "@/components/pagination";
import { resetStatusDeleteThumbnail } from "@/store/articles/deleteThumbnailByUrl";
import { SearchBar } from "@/components/search-bar";
import { Select } from "@chakra-ui/select";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export function DashboardSection() {
	const [sort, setSort] = useState("latest");

	const dispatch = useDispatch();
	const user = useSelector(currentUser);
	const { status, message, data } = useSelector(selectArticleByAuthor);
	const { status: statusDelete, articleId } = useSelector(getDeleteArticleById);
	const { isOpen } = useSelector(getModal);

	useEffect(() => {
		dispatch(fetchArticleByAuthor(user.uid));
	}, [dispatch, user.uid]);

	useEffect(() => {
		if (statusDelete === "success") {
			dispatch(fetchArticleByAuthor(user.uid));
		}
	}, [dispatch, statusDelete, user.uid]);

	useEffect(() => {
		return () => {
			dispatch(resetStatusDeleteArticle());
			dispatch(resetStatusDeleteThumbnail());
			dispatch(resetModal());
		};
	}, [dispatch]);

	const handleToggleModal = () => {
		dispatch(toggleModal());
	};

	const handleConfirmDelete = () => {
		dispatch(deleteArticleById(articleId));
	};

	return (
		<Container
			as={"main"}
			maxW={"100%"}
			display={"flex"}
			flex={1}
			flexDir={"column"}
			gap={5}
			px={12}
		>
			<HStack
				alignItems="flex-start"
				justifyContent="space-between"
				spacing={4}
			>
				<SearchBar />
				<Select
					placeholder="Sort by"
					size="lg"
					w="150px"
					value={sort}
					onChange={(e) => setSort(e.target.value)}
				>
					<option value="latest">Latest</option>
					<option value="oldest">Oldest</option>
				</Select>
			</HStack>

			<Tabs>
				<TabList>
					<Tab>Published</Tab>
					<Tab>Draft</Tab>
				</TabList>
				<TabPanels>
					<TabPanel px={0}>
						{status === "loading" && <LoadSpinner />}
						{status === "failed" && (
							<Heading
								as="h1"
								size="lg"
								fontWeight="bold"
								textAlign="center"
							>
								No Published Article Found
							</Heading>
						)}
						{status === "success" && (
							<>
								{data.length === 0 ? (
									<Heading
										as="h1"
										size="lg"
										fontWeight="bold"
										textAlign="center"
									>
										No Published Article Found
									</Heading>
								) : (
									<Pagination
										data={data}
										renderItem={(item) => (
											<HorizontalArticleCard
												key={item.id}
												articleData={item}
												onDelete={handleToggleModal}
											/>
										)}
										itemsPerPage={3}
									/>
								)}
							</>
						)}
					</TabPanel>

					<TabPanel px={0}>
						<Heading
							as="h1"
							size="lg"
							fontWeight="bold"
							textAlign="center"
						>
							No Draft Article Found
						</Heading>
					</TabPanel>
				</TabPanels>
			</Tabs>

			<DeleteModal
				isOpen={isOpen}
				onClose={handleToggleModal}
				onDelete={handleConfirmDelete}
			/>
		</Container>
	);
}
