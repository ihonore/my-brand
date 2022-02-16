class Auth {

	logOut() {
		localStorage.removeItem("token");
        localStorage.removeItem('currentUser');
		window.location.reload();
	}
}

const auth = new Auth();

document.querySelector(".logout").addEventListener("click", (e) => {
	auth.logOut();
});