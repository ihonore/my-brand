class Auth {
	constructor() {
        document.querySelector("html").style.display = "none";
		const auth = localStorage.getItem("token");
		this.validateAuth(auth);
	}

	validateAuth(auth) {
		if (!auth) {
			window.location.replace("/login.html");
		} else {
            document.querySelector("html").style.display = "block";
		}
	}

	logOut() {
		localStorage.removeItem("token");
		localStorage.removeItem('currentUser');
		window.location.replace("/login.html");
	}
}
