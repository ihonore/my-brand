class Login {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	validateonSubmit() {
		let self = this;
		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			var error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
			});
			if (error == 0) {
				localStorage.setItem("auth", 1);
				this.form.submit();
			}
		});
	}

	validateFields(field) {
		if (field.value.trim() === "") {
			this.setStatus(
				field,
				`${field.previousElementSibling.innerText}This field cannot be blank`,
				"error"
			);
			return false;
		}
		else {
			let credentials=JSON.parse(localStorage.getItem('account'));
			if (field.type == "password") {
				if (field.value.length < 8) {
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} Invalid Credentials`,
						"error"
					);
					return false;
				} else if(field.value!=credentials.password){
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} Invalid credentials`,
						"error"
					);
					return false;
				}
				else {
					this.setStatus(field, null, "success");
					return true;
				}
			}
			if(field.type=="text"){
				if(field.value==credentials.username || field.value==credentials.email){
					this.setStatus(field, null, "success");
					return true;
				}
				else{
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} Please enter a correct username or email `,
						"error"
					);
					return false;
				}
			}
			else {
				this.setStatus(field, null, "success");
				return true;
			}
		}
	}

	setStatus(field, message, status) {
		const errorMessage = field.parentElement.querySelector(".error-message");

		if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
		}
	}
}

const form = document.querySelector(".login-form");

if (form) {
	const fields = ["username", "password"];
	const validator = new Login(form, fields);
}

//Setting Admin password
let user=JSON.parse(localStorage.getItem('account'));
if(!user){
let account={username:'admin',
email:"ihonore01@gmail.com",
password:'password',
profilePicture:'profile'
}
localStorage.setItem('account',JSON.stringify(account));
}
