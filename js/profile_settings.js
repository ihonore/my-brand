const profileForm=document.getElementById('profile-form');
const profileImage=document.querySelectorAll('.profile-image');
const displayUser=document.querySelector('.user');
const uploadPhoto=document.getElementById('upload-photo');
const error=document.querySelector('.profile-error-message');

const userName=document.getElementById('username');
const oldPassword=document.getElementById('old-password');
const newPassword=document.getElementById('new-password1');
const confirmPassword=document.getElementById('new-password2');

let fetchedUser=JSON.parse(localStorage.getItem('account'));
userName.value=fetchedUser.username;
profileForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(fetchedUser);
    if(!oldPassword.value && !newPassword.value && !confirmPassword.value && (userName.value==fetchedUser.username) && !uploadPhoto.value){
        error.textContent='No changes to save';
    }
    else if(uploadPhoto.value && !oldPassword.value && !newPassword.value && !confirmPassword.value && (userName.value==fetchedUser.username)){
        fetchedUser.profilePicture=chosenImage;
        localStorage.setItem('account',JSON.stringify(fetchedUser));
        error.style.color="green";
        error.textContent='Profile Picture changed successfully!';
        displayProfile();

        setTimeout(() => {
            error.textContent="";
          }, 3000);

    }
    else if(!uploadPhoto.value && !oldPassword.value && !newPassword.value && !confirmPassword.value && (userName.value!=fetchedUser.username)){
        fetchedUser.username=userName.value;
        localStorage.setItem('account',JSON.stringify(fetchedUser));
        error.style.color="green";
        error.textContent='username changed successfully!';
        displayProfile();
        setTimeout(() => {
            error.textContent="";
          }, 3000);
    }
    else if(uploadPhoto.value && !oldPassword.value && !newPassword.value && !confirmPassword.value && (userName.value!=fetchedUser.username)){
        fetchedUser.username=userName.value;
        fetchedUser.profilePicture=chosenImage;
        localStorage.setItem('account',JSON.stringify(fetchedUser));
        error.style.color="green";
        error.textContent='username and profile picture changed successfully!';
        displayProfile();
        setTimeout(() => {
            error.textContent="";
          }, 3000);
    }
    else if(!uploadPhoto.value && oldPassword.value && newPassword.value && confirmPassword.value && (userName.value==fetchedUser.username)){
        if(oldPassword.value!=fetchedUser.password){
            error.textContent="Your old password does't match";
        }
        else if(newPassword.value!=confirmPassword.value){
            error.textContent="Your new passwords don't match";
        }
        else{
            fetchedUser.password=newPassword.value;
            localStorage.setItem('account',JSON.stringify(fetchedUser));
            error.style.color="green";
            error.textContent='Password changed successfully!';

            setTimeout(() => {
                oldPassword.value="";
                newPassword.value="";
                confirmPassword.value="";
                error.textContent="";
              }, 3000);
    
        }

    }
    else if(!uploadPhoto.value && oldPassword.value && newPassword.value && confirmPassword.value && (userName.value!=fetchedUser.username)){
        if(oldPassword.value!=fetchedUser.password){
            error.textContent="Your old password does't match";
        }
        else if(newPassword.value!=confirmPassword.value){
            error.textContent="Your new passwords don't match";
        }
        else{
            fetchedUser.password=newPassword.value;
            fetchedUser.username=userName.password;
            localStorage.setItem('account',JSON.stringify(fetchedUser));
            error.style.color="green";
            error.textContent='Username and password changed successfully!';
            displayProfile();

            setTimeout(() => {
                oldPassword.value="";
                newPassword.value="";
                confirmPassword.value="";
                error.textContent="";
              }, 3000);
        }

    }
    
    else{
        if(oldPassword.value!=fetchedUser.password){
            error.textContent="Your old password does't match";
        }
        else if(newPassword.value!=confirmPassword.value){
            error.textContent="Your new passwords don't match";
        }
        else{
            fetchedUser.username=userName.value;
            fetchedUser.password=newPassword.value;
            fetchedUser.profilePicture=chosenImage;
            localStorage.setItem('account',JSON.stringify(fetchedUser));
            error.style.color="green";
            error.textContent='All changes saved successfully!';
            displayProfile();

            setTimeout(() => {
                oldPassword.value="";
                newPassword.value="";
                confirmPassword.value=""
                uploadPhoto.value="";
                error.textContent="";
              }, 3000);
    
        }
    }      
    
})

      var chosenImage;
      uploadPhoto.addEventListener('change',function(){
          const fileReader= new FileReader();
      
          fileReader.addEventListener('load',() =>{
              chosenImage=fileReader.result;
              profileImage.forEach(image =>{
                  image.setAttribute('src',chosenImage);
              })
          })
          fileReader.readAsDataURL(this.files[0]);
      });

function displayProfile(){
   let userProfile =JSON.parse(localStorage.getItem('account'));
   let profilephoto=userProfile.profilePicture;
   displayUser.textContent=userProfile.username;
   profileImage.forEach(image =>{
   image.setAttribute('src',profilephoto);
})
}
displayProfile();