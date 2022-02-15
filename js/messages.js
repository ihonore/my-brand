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
    data.forEach((element) => {
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
        <div class="delete-btn" onClick='deleteMessage("${element._id}")'>
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


function deleteMessage(id){
    confirmDiv.style.display="block";
        
    confirmCancelBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        confirmDiv.style.display="none";
    });
    confirmOkBtn.addEventListener('click', async()=>{
        const response= await fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/queries/${id}`,{
                method:'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

        const fetchedResponse= await response.json()
        console.log(fetchedResponse);
        confirmDiv.style.display="none";
        displayMessages();
    });
}


const profileImage=document.querySelector('.profile-image');
const displayUser=document.querySelector('.user');

async function displayProfile(){

    let userEmail =localStorage.getItem('currentUser');

    const response= await fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/users/${userEmail}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const user= await response.json()
    const userProfile=user.data;
    
    let profilephoto=userProfile.picture;
    displayUser.textContent=userProfile.username;
    profileImage.setAttribute('src', profilephoto);
 }
 displayProfile();