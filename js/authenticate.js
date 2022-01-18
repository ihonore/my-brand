class Auth {
	constructor() {
        document.querySelector("html").style.display = "none";
		const auth = localStorage.getItem("auth");
		this.validateAuth(auth);
	}

	validateAuth(auth) {
		if (auth != 1) {
			window.location.replace("/login.html");
		} else {
            document.querySelector("html").style.display = "block";
		}
	}

	logOut() {
		localStorage.removeItem("auth");
		window.location.replace("/login.html");
	}
}
