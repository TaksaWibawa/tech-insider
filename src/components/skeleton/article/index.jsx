import { AspectRatio, Box, HStack, Skeleton, VStack } from "@chakra-ui/react";

export function ArticleSkeleton() {
	return (
		<>
			<AspectRatio
				ratio={4 / 3}
				maxW="100%"
			>
				<Skeleton
					height="100%"
					width="100%"
				/>
			</AspectRatio>

			<Box
				width={{ base: "100%", md: "70%" }}
				mt={{ base: 4, md: 0 }}
			>
				<Skeleton
					height="40px"
					width="100%"
				/>
			</Box>

			<HStack mt="2">
				<Skeleton
					height="20px"
					width="20%"
				/>
			</HStack>

			<HStack mt="4">
				<Box>
					<Skeleton
						height="40px"
						width="40px"
						borderRadius="full"
					/>
				</Box>
				<VStack
					alignItems={{ base: "center", md: "flex-start" }}
					justifyContent={"flex-start"}
					gap={0}
					ml={{ base: 0, md: 2 }}
				>
					<Skeleton
						height="20px"
						width="100%"
					/>
					<Skeleton
						height="20px"
						width="100%"
					/>
				</VStack>
			</HStack>

			<Box mt="4">
				<Skeleton
					height="20px"
					width="100%"
				/>
				<Skeleton
					height="20px"
					width="100%"
				/>
				<Skeleton
					height="20px"
					width="100%"
				/>
			</Box>
		</>
	);
}
