//This file will fetch messages from the database and display them
const messagesContainer=document.querySelector('#messages-container');
let readyToAppend=document.createElement('div');

const token = localStorage.getItem('token')

async function displayMessages(){

    const response= await fetch("https://ihonore-api-deploy.herokuapp.com/api/v1/queries",{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const queries= await response.json()
    const data=queries.data;
    console.log(data);

    let myMessages="";
    data.forEach((element,index) => {
    let template=`
    <div class="message-card">
        <div class="message-wrapper">
            <p class="user-names">${element.senderName} .<span class="user-email">&nbsp; 
            <a href="mailto:${element.email}?subject=REPLY FROM WEBSITE">${element.email}</a>
            </span><span class="location"><span>Location :</span> ${element.location}</span> </p>
             <details>
                <summary>${element.message.substring(0,60)} -</summary>
                    <span class="message">${element.message.substring(50)}</span>
             </details>
        </div>
        <div class="delete-btn" onClick='deleteMessage(${index})'>
            <span><i class="far fa-trash-alt"></i></span>
        </div>
    </div>`

    myMessages+=template;
    })
    readyToAppend.innerHTML=myMessages;
    messagesContainer.appendChild(readyToAppend);
}

displayMessages();

//Deleting Messages

const confirmDiv=document.querySelector('.confirm-overlay');
const confirmOkBtn=document.getElementById('ok');
const confirmCancelBtn=document.getElementById('no');


function deleteMessage(index){
confirmDiv.style.display="block";
    
confirmCancelBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    confirmDiv.style.display="none";
});
confirmOkBtn.addEventListener('click',()=>{
    let retrieved=JSON.parse(localStorage.getItem('messages'));
    retrieved.splice(index,1);
    console.log(retrieved);
    localStorage.setItem('messages',JSON.stringify(retrieved));
    confirmDiv.style.display="none";
    displayMessages();
    updateMessageCount();
});
}


const profileImage=document.querySelector('.profile-image');
const displayUser=document.querySelector('.user');

  function displayProfile(){
    let userProfile =JSON.parse(localStorage.getItem('account'));
    let profilephoto=userProfile.profilePicture;
    displayUser.textContent=userProfile.username;
    profileImage.setAttribute('src',profilephoto);
 }
 displayProfile();