import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";

export class AuthService {
	isAuthenticated() {
		if (this.getToken()) return true;
		return false;
	}

	getToken() {
		const token = Cookies.get("idToken");
		return token;
	}

	getRefreshToken() {
		return Cookies.get("refreshToken");
	}

	storeCredentialsToCookie({ idToken, refreshToken }) {
		const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
		if (idToken) Cookies.set("idToken", idToken, { expires });
		Cookies.set("refreshToken", refreshToken);
	}

	clearCredentialsFromCookie() {
		Cookies.remove("idToken");
		Cookies.remove("refreshToken");
	}

	async logOut() {
		try {
			await signOut(auth);
			this.clearCredentialsFromCookie();
			window.location.href = "/";
		} catch (err) {
			console.error(err);
		}
	}
}
