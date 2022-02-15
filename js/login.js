
const loginForm = document.querySelector(".login-form");
const emailInput=document.getElementById('username')
const passwordInput=document.getElementById('password')


loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	validateOnSubmit();
	logIn();
	
  });
  
  function validateOnSubmit() {

	const email = emailInput.value.trim();
	const password = passwordInput.value.trim();
  
	if(emailInput.type=='text'){
		if(email =='') {

			setErrorStatus(emailInput, 'Email cannot be blank');
	
		  }
		  else if(!isEmail(email)){
			  setErrorStatus(emailInput, 'Please enter a valid email address');
		  } 
		  
		  else{
			  setSuccessStatus(emailInput);
		  }
	}
    if(passwordInput.type=='password'){
		if (password === "") {
			setErrorStatus(passwordInput, "Password cannot be blank");
		  } else {
			setSuccessStatus(passwordInput);
		  }
	}
	
	}

	function setErrorStatus(input, message) {

		const errorMessage = input.parentElement.querySelector(".error-message");
		errorMessage.innerText = message;
		input.classList.add("input-error");
	  }

	function setSuccessStatus(input) {

		const errorMessage = input.parentElement.querySelector(".error-message");
		if (errorMessage) {
			errorMessage.innerText = "";
			}
		input.classList.remove("input-error");
	  }
  
  function isEmail(emailAddress) {
  
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regEx.test(emailAddress);
  }

  function logIn() {
	  fetch('https://ihonore-api-deploy.herokuapp.com/api/v1/users/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: emailInput.value,
			password: passwordInput.value
		})
	})
	.then(res => res.json())
	.then(data => {
	  if (data.status == 200){
		localStorage.setItem('token', data.accessToken)
		window.location = "/admin/index.html";
	  }
	  console.log(data)
	})
}
