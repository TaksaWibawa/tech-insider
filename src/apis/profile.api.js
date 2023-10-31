import { db } from "@/config/firebase";
import { doc, getDoc } from "@firebase/firestore";

export const APIProfile = {
	getUserProfile: async (uid) => {
		try {
			const docRef = doc(db, "users", uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				const userData = docSnap.data();
				return userData;
			} else {
				console.log("No such document!");
				return null;
			}
		} catch (err) {
			throw new Error(err);
		}
	},
};
