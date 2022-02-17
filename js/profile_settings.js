const profileForm=document.getElementById('profile-form');
const profileImage=document.querySelectorAll('.profile-image');
const displayUser=document.querySelector('.user');
const uploadPhoto=document.getElementById('upload-photo');
const error=document.querySelector('.profile-error-message');

const userName=document.getElementById('username');
const oldPassword=document.getElementById('old-password');
const newPassword=document.getElementById('new-password1');
const confirmPassword=document.getElementById('new-password2');
const saveBtn=document.getElementById('save-changes')

const token = localStorage.getItem('token')
const currentUser=localStorage.getItem('currentUser')


profileForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    saveBtn.innerHTML += '<i class="fas fa-spinner fa-spin"></i>';
    let userEmail =localStorage.getItem('currentUser');
    
        const response= await fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/users/${userEmail}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const user= await response.json()
        const userProfile=user.data;
    
    if(!newPassword.value && !confirmPassword.value && (userName.value==userProfile.username) && !uploadPhoto.value){
        error.textContent='No changes to save';
        saveBtn.innerHTML="Save Changes"
        setTimeout(()=>{
            error.textContent=""
        },2000)
    }
    else if(uploadPhoto.value && !newPassword.value && !confirmPassword.value && (userName.value==userProfile.username)){

        //discarding form fields with no changes
        newPassword.removeAttribute('name')
        confirmPassword.removeAttribute('name')


        fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/users/${userEmail}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: new FormData(profileForm)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
          if (data.status == 200){
            error.style.color="green";
            error.textContent='Profile Picture changed successfully!';
            saveBtn.innerHTML="Save Changes"
          }
        }).then(()=>{
          setTimeout(() => {
            error.textContent="";
            displayProfile()
            }, 2000);
        }) 

    }
    else if(!uploadPhoto.value && !newPassword.value && !confirmPassword.value && (userName.value!=userProfile.username)){

        //discarding form fields with no changes
        newPassword.removeAttribute('name')
        confirmPassword.removeAttribute('name')
        uploadPhoto.removeAttribute('name')

        fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/users/${userEmail}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: new FormData(profileForm)
          })
          .then(res => res.json())
          .then(data => {
              console.log(data)
            if (data.status == 200){
              error.style.color="green";
              error.textContent='Username changed successfully!';
              saveBtn.innerHTML="Save Changes"
            }
          }).then(()=>{
            setTimeout(() => {
              error.textContent="";
              displayProfile()
              }, 2000);
          }) 
    }
    else if(uploadPhoto.value && !newPassword.value && !confirmPassword.value && (userName.value!=userProfile.username)){

        newPassword.removeAttribute('name')
        confirmPassword.removeAttribute('name')

        fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/users/${userEmail}`, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: new FormData(profileForm)
          })
          .then(res => res.json())
          .then(data => {
            if (data.status == 200){
              error.style.color="green";
              error.textContent='Username and profile picture changed successfully!';
              saveBtn.innerHTML="Save Changes"
            }
          }).then(()=>{
            setTimeout(() => {
              error.textContent="";
              displayProfile()
              }, 2000);
          }) 

    }
    else if(!uploadPhoto.value && newPassword.value && confirmPassword.value && (userName.value==userProfile.username)){
        if(newPassword.value!=confirmPassword.value){
            error.textContent="Your passwords don't match";
            saveBtn.innerHTML="Save Changes"
        }
        else{

            confirmPassword.removeAttribute('name')
            uploadPhoto.removeAttribute('name')

            fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/users/${userEmail}`, {
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: new FormData(profileForm)
              })
              .then(res => res.json())
              .then(data => {
                if (data.status == 200){
                  error.style.color="green";
                  error.textContent='Password changed successfully!';
                  saveBtn.innerHTML="Save Changes"
                }
              }).then(()=>{
                setTimeout(() => {
                  error.textContent="";
                  newPassword.value="";
                  confirmPassword.value=""
                  displayProfile()
                  }, 2000);
              }) 
    
        }

    }
    else if(!uploadPhoto.value && newPassword.value && confirmPassword.value && (userName.value!=userProfile.username)){

    
        if(newPassword.value!=confirmPassword.value){
            error.textContent="Your passwords don't match";
            saveBtn.innerHTML="Save Changes"
        }
        else{

            confirmPassword.removeAttribute('name')
            uploadPhoto.removeAttribute('name')

            fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/users/${userEmail}`, {
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: new FormData(profileForm)
              })
              .then(res => res.json())
              .then(data => {
                if (data.status == 200){
                  error.style.color="green";
                  error.textContent='Username and password changed successfully!';
                  saveBtn.innerHTML="Save Changes"
                }
              }).then(()=>{
                setTimeout(() => {
                  error.textContent="";
                  newPassword.value="";
                  confirmPassword.value=""
                  displayProfile()
                  }, 2000);
              }) 
        }

    }
    
    else{
        if(newPassword.value!=confirmPassword.value){
            error.textContent="Your passwords don't match";
            saveBtn.innerHTML="Save Changes"
        }
        else{

            confirmPassword.removeAttribute('name')

            fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/users/${userEmail}`, {
                method: 'PATCH',
                headers: {
                  'Authorization': `Bearer ${token}`
                },
                body: new FormData(profileForm)
              })
              .then(res => res.json())
              .then(data => {
                if (data.status == 200){
                  error.style.color="green";
                  error.textContent='All changes saved successfully!';
                  saveBtn.innerHTML="Save Changes"
                }
              }).then(()=>{
                setTimeout(() => {
                    error.textContent="";
                    newPassword.value="";
                    confirmPassword.value=""
                    uploadPhoto.value="";
                  displayProfile()
                  }, 2000);
              }) 
    
        }
    }      
    
})


    //display profile information

    async function displayProfile(){

        let userEmail =localStorage.getItem('currentUser');
    
        const response= await fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/users/${userEmail}`,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const user= await response.json()
        const userProfile=user.data;
        
        let profilePhoto=userProfile.picture;
        displayUser.textContent=userProfile.username;
        userName.value=userProfile.username;
        profileImage.forEach(profile=>{
            profile.setAttribute('src', profilePhoto);
        })
     }
     displayProfile();