//This file will fetch messages from local storage and display them
const messagesContainer=document.querySelector('#messages-container');
let readyToAppend=document.createElement('div');

function displayMessages(){
    var newMessages;
    retrivedMessages = JSON.parse( localStorage.getItem('messages'));
        if(retrivedMessages){
            newMessages=retrivedMessages;
    
        }else{
            newMessages = [];
        }
    let myMessages="";
    newMessages.forEach((element,index) => {
    let template=`
    <div class="message-card">
        <div class="message-wrapper">
            <p class="user-names">${element.userName} .<span class="user-email">&nbsp; <a href="mailto:${element.email}?subject=REPLY FROM WEBSITE">${element.email}</a></span><span class="location"><span>Location :</span> ${element.location}</span> </p>
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

function deleteMessage(index,e){
    var checker=confirm("Are you sure? ⚠️");
    if(checker===false){
        e.preventDefault();
    } else{
        let retrieved=JSON.parse(localStorage.getItem('messages'));
    retrieved.splice(index,1);
    console.log(retrieved);
    localStorage.setItem('messages',JSON.stringify(retrieved));
    displayMessages();
    }  
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