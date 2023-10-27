import {
	collection,
	doc,
	getDoc,
	getDocs,
	addDoc,
	serverTimestamp,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config/firebase";
import { v4 as uuid } from "uuid";

export const APIArticles = {
	getAllArticles: async () => {
		try {
			const querySnapshot = await getDocs(collection(db, "articles"));

			const articlePromises = querySnapshot.docs.map((doc) => {
				const id = doc.id;
				return APIArticles.getArticle(id);
			});

			const resolvedArticles = await Promise.all(articlePromises);

			return resolvedArticles;
		} catch (err) {
			throw new Error(err);
		}
	},

	getArticle: async (articleId) => {
		try {
			const docRef = doc(db, "articles", articleId);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const articleData = docSnap.data();
				articleData.id = docSnap.id;

				const authorRef = articleData.authorRef;
				const authorDocSnap = await getDoc(authorRef);

				if (authorDocSnap.exists()) {
					const authorData = authorDocSnap.data();
					articleData.author = authorData;
					delete articleData.authorRef;
				}

				if (articleData.created) {
					const created = articleData.created;
					const date = new Date(created.seconds * 1000);
					articleData.created = date.toDateString();
				}

				return articleData;
			}
		} catch (err) {
			throw new Error(err);
		}
	},

	getArticleThumbnail: async (thumbnailName) => {
		try {
			const thumbnailRef = ref(storage, `thumbnails/${thumbnailName}`);
			const thumbnailUrl = await getDownloadURL(thumbnailRef);
			return thumbnailUrl;
		} catch (err) {
			throw new Error(err);
		}
	},

	addArticle: async (articleData) => {
		try {
			// add authorRef for reference of author
			const { uid } = articleData.author;
			const authorRef = doc(db, "users", uid);
			articleData.authorRef = authorRef;

			// delete author property
			delete articleData.author;

			// add when article is created
			articleData.created = serverTimestamp();

			// get thumbnailUrl
			const thumbnailUrl = await APIArticles.addArticleThumbnail(
				articleData.thumbnail
			);
			articleData.thumbnailUrl = thumbnailUrl;

			// delete thumbnail property
			delete articleData.thumbnail;

			// add article to firestore
			await addDoc(collection(db, "articles"), articleData);

			// return success message
			return "Article added successfully";
		} catch (err) {
			throw new Error(err);
		}
	},

	addArticleThumbnail: async (thumbnail) => {
		try {
			const metadata = {
				contentType: "image/png",
			};

			const thumbnailName = `${uuid(10)}_${thumbnail.name}`;
			const thumbnailRef = ref(storage, `thumbnails/${thumbnailName}`);

			const uploadThumbnail = await uploadBytesResumable(
				thumbnailRef,
				thumbnail,
				metadata
			);

			const snapshot = await uploadThumbnail.task;
			const thumbnailUrl = await getDownloadURL(snapshot.ref);

			return thumbnailUrl;
		} catch (err) {
			throw new Error(err);
		}
	},
};
