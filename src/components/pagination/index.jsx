/* eslint-disable react/prop-types */
import { useState } from "react";
import { Flex, Button, HStack, Grid, Container, Text } from "@chakra-ui/react";
import { ButtonPrimary } from "@/components/button";

export function Pagination({ data, itemsPerPage, renderItem }) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(data.length / itemsPerPage);

	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	const renderContent = () => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		return data
			.slice(startIndex, endIndex)
			.map((item, index) => renderItem(item, index));
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];

		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 5; i++) {
					pageNumbers.push(i);
				}
			} else if (currentPage >= totalPages - 2) {
				for (let i = totalPages - 4; i <= totalPages; i++) {
					pageNumbers.push(i);
				}
			} else {
				for (let i = currentPage - 2; i <= currentPage + 2; i++) {
					pageNumbers.push(i);
				}
			}
		}

		return pageNumbers.map((pageNumber) => (
			<Button
				key={pageNumber}
				variant={currentPage === pageNumber ? "solid" : "outline"}
				colorScheme={currentPage === pageNumber ? "blue" : "gray"}
				onClick={() => handlePageChange(pageNumber)}
			>
				{pageNumber}
			</Button>
		));
	};

	return (
		<Container
			as="section"
			maxW={"full"}
			p={0}
		>
			<Grid
				templateColumns={"repeat(1, 1fr)"}
				mb={6}
			>
				{renderContent()}
			</Grid>

			<Flex
				align="center"
				flexDir={"column"}
				justify="center"
			>
				<HStack spacing={2}>
					<ButtonPrimary
						key="prev"
						onClick={() => handlePageChange(currentPage - 1)}
						isDisabled={currentPage === 1}
					>
						{"Prev"}
					</ButtonPrimary>
					{renderPageNumbers()}
					<ButtonPrimary
						key="next"
						onClick={() => handlePageChange(currentPage + 1)}
						isDisabled={currentPage === totalPages}
					>
						{"Next"}
					</ButtonPrimary>
				</HStack>
				<Text
					mt={2}
					ml={2}
					color={"gray.800"}
					fontSize={"sm"}
					lineHeight={"1.5"}
					noOfLines={1}
					fontWeight={"semibold"}
				>{`Page ${currentPage} of ${totalPages}`}</Text>
			</Flex>
		</Container>
	);
}
