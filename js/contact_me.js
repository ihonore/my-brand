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

        //Check if Name doen not contain numbers or special characters 
        //and check if name is not less than 3 characters

       else if(!(/[a-zA-Z]/g.test(user.value)) || user.value.trim().length<3){
            errorMessage.innerHTML='Enter a valid name';
        }
    else{
        let fetchedMessages=JSON.parse(localStorage.getItem('messages'));
        if(fetchedMessages){
            completeMessages=fetchedMessages;
        }
        else{
            completeMessages=[];
        }
        getLocation();
        let thisMessage={
            userName: user.value,
            email: email.value,
            message: message.value,
            location: 'Kigali, Rwanda'
        }
        console.log(thisMessage);
        completeMessages.push(thisMessage);
        localStorage.setItem('messages',JSON.stringify(completeMessages));
        errorMessage.style.cssText='color:white; background:lightgreen;border-radius:5px; text-align:center;padding:2px;';
        errorMessage.innerHTML='Thank you for messaging me!';
        errorMessage.classList.toggle('open-modal');

        setTimeout(() => {
            errorMessage.classList.toggle('open-modal');
            contactForm.reset();
          }, 3000);

    }
    }
})


//Lets get user's geolocation

function getLocation(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{
       locationMessage="Geolocation is not supported by this browser.";
    }
}

function showPosition(position){
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    displayLocation(lat,lon);
}

function showError(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            locationMessage="User denied the request for Geolocation."
        break;
        case error.POSITION_UNAVAILABLE:
            locationMessage="Location information is unavailable."
        break;
        case error.TIMEOUT:
            locationMessage="The request to get user location timed out."
        break;
        case error.UNKNOWN_ERROR:
            locationMessage="An unknown error occurred."
        break;
    }
}

function displayLocation(latitude,longitude){
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  value=add.split(",");

                    count=value.length;
                    country=value[count-1];
                    state=value[count-2];
                    city=value[count-3];
                   locationMessage = `${city}, ${country}`;
                }
                else  {
                   locationMessage = "address not found";
                }
            }
            else {
               locationMessage = `Geocoder failed due to: ${status}`;
            }
        }
    );
}

