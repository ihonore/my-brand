//This file will fetch and display most recent messages
const messagesDashboard=document.querySelector('#dashboard-messages');
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
    // console.log(data);


    let myMessages="";
    let length=data.length;
    updateMessageCount(length);
    //if we only have one message in the database
    if (length==1){
        let template=`
            <div class="message-card">
                <div class="message-wrapper">
                    <p class="user-names">${data[0].senderName} .<span class="user-email">&nbsp; <a href="mailto:${data[0].email}?subject=REPLY FROM WEBSITE">${data[0].email}</a></span><span class="location"><span>Location :</span> ${data[0].location}</span> </p>
                     <details>
                        <summary>${data[0].message.substring(0,60)} -</summary>
                            <span class="message">${data[0].message.substring(50)}</span>
                     </details>
                </div>
                <div class="delete-btn" onClick='deleteMessage(${0})'>
                    <span><i class="far fa-trash-alt"></i></span>
                </div>
            </div>`
        
            myMessages+=template;
    }
    
    //if the database has more than one message
    else{
        for(let i=length-1 ;i>=length-2;i--){
    
            let template=`
            <div class="message-card">
                <div class="message-wrapper">
                    <p class="user-names">${data[i].senderName} .<span class="user-email">&nbsp; <a href="mailto:${data[i].email}?subject=REPLY FROM WEBSITE">${data[i].email}</a></span><span class="location"><span>Location :</span> ${data[i].location}</span> </p>
                     <details>
                        <summary>${data[i].message.substring(0,60)} -</summary>
                            <span class="message">${data[i].message.substring(50)}</span>
                     </details>
                </div>
                <div class="delete-btn" onClick='deleteMessage(${i})'>
                    <span><i class="far fa-trash-alt"></i></span>
                </div>
            </div>`
        
            myMessages+=template;
    }

    }
    
    readyToAppend.innerHTML=myMessages;
    messagesDashboard.appendChild(readyToAppend);
    
}

displayMessages();

//delete messages
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

//updating Totals messages and Total numbers
const messageCount=document.querySelector('#messages-count');
const articleCount=document.querySelector('#blogs-count');

function updateMessageCount(count){
     messageCount.innerHTML=count;
}

function updateBlogsCount(){
   let articlesCount=0;
   let retrivedArticles = JSON.parse( localStorage.getItem('articles'));
        if(retrivedArticles){
            articlesCount=retrivedArticles.length;
            articleCount.innerHTML=articlesCount;
    
        }else{
            articleCount.innerHTML=articlesCount;
        }
    
}
// updateMessageCount();
updateBlogsCount();

const profileImage=document.querySelector('.profile-image');
const displayUser=document.querySelector('.user');

function displayProfile(){
    let userProfile =JSON.parse(localStorage.getItem('account'));
    let profilephoto=userProfile.profilePicture;
    displayUser.textContent=userProfile.username;
    profileImage.setAttribute('src',profilephoto);
 }
 displayProfile();