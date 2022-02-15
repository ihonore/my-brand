//This file will be grabbing queries(messages) from clients and store them to local storage

const contactForm =document.querySelector('.contact-form');
const user=document.getElementById('name');
const email=document.getElementById('email');
const message=document.getElementById('message');
const sendBtn=document.getElementById('submit');
const errorMessage=document.querySelector('.contact-error');
var locationMessage;

var completeMessages;
contactForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!user.value || !email.value || !message.value){
        errorMessage.classList.toggle('open-modal');
        errorMessage.innerHTML="Please fill all the fields";
    }else{
        //Validate email

        let regex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!regex.test(email.value)){
            errorMessage.innerHTML='Please enter a valid email address';
        }

        //Check if Name does not contain numbers or special characters 
        //and check if name is not less than 3 characters

       else if(!(/[a-zA-Z]/g.test(user.value)) || user.value.trim().length<3){
            errorMessage.innerHTML='Enter a valid name';
        }
    else{

        let thisMessage={
            senderName: user.value,
            email: email.value,
            message: message.value,
            location: locationMessage
        }

        fetch('https://ihonore-api-deploy.herokuapp.com/api/v1/queries', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(thisMessage)
        })
        .then(res => res.json())
        .then(data => {
          if (data.status == 200){
            errorMessage.style.cssText='color:white; background:lightgreen;border-radius:5px; text-align:center;padding:2px;';
            errorMessage.innerHTML='Thank you for messaging me!';
            errorMessage.classList.toggle('open-modal');
          }
          console.log(data)
        })
   
        setTimeout(() => {
            errorMessage.classList.toggle('open-modal');
            contactForm.reset();
          }, 3000);

    }
    }
})


//Lets get user's geolocation

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("The Browser Does not Support Geolocation");
    }
  }

  async function showPosition(position) {
    const { latitude, longitude } = position.coords;
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b4803697ce5a4dfca6ee6eac8f249f62`
    );
    const results = await response.json();

    const myFormat=results.results[0].formatted;
    locationMessage=myFormat.split(', ').splice(1).join(", ");
    const userLoc = JSON.stringify(results.results[0].formatted);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        locationMessage="User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        locationMessage="Location information is unavailable.";
        break;
      case error.TIMEOUT:
        locationMessage="The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        locationMessage="An unknown error occurred.";
        break;
    }
  }
  getLocation();
