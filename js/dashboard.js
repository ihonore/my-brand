//This file will fetch and display most recent messages
const messagesDashboard=document.querySelector('#dashboard-messages');
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
    let length=newMessages.length;

    //if the local storage has only one message
    if (length==1){
        let template=`
            <div class="message-card">
                <div class="message-wrapper">
                    <p class="user-names">${newMessages[0].userName} .<span class="user-email">&nbsp; <a href="mailto:${newMessages[0].email}?subject=REPLY FROM WEBSITE">${newMessages[0].email}</a></span><span class="location"><span>Location :</span> ${newMessages[0].location}</span> </p>
                     <details>
                        <summary>${newMessages[0].message.substring(0,60)} -</summary>
                            <span class="message">${newMessages[0].message.substring(50)}</span>
                     </details>
                </div>
                <div class="delete-btn" onClick='deleteMessage(${0})'>
                    <span><i class="far fa-trash-alt"></i></span>
                </div>
            </div>`
        
            myMessages+=template;
    }
    
    //local storage has more than one message
    else{
        for(let i=length-1 ;i>=length-2;i--){
    
            let template=`
            <div class="message-card">
                <div class="message-wrapper">
                    <p class="user-names">${newMessages[i].userName} .<span class="user-email">&nbsp; <a href="mailto:${newMessages[i].email}?subject=REPLY FROM WEBSITE">${newMessages[i].email}</a></span><span class="location"><span>Location :</span> ${newMessages[i].location}</span> </p>
                     <details>
                        <summary>${newMessages[i].message.substring(0,60)} -</summary>
                            <span class="message">${newMessages[i].message.substring(50)}</span>
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

function deleteMessage(index,e){
    var checker=confirm("Are you sure? ⚠️");
    if(checker===false){
        e.preventDefault();
    }else{
    let retrieved=JSON.parse(localStorage.getItem('messages'));
    retrieved.splice(index,1);
    console.log(retrieved);
    localStorage.setItem('messages',JSON.stringify(retrieved));
    displayMessages();
    updateMessageCount();
    }  
  }

//updating Totals messages and Total numbers
const messageCount=document.querySelector('#messages-count');
const articleCount=document.querySelector('#blogs-count');

function updateMessageCount(){
   let messagesCount=0;
   let retrivedMessages = JSON.parse( localStorage.getItem('messages'));
        if(retrivedMessages){
            messagesCount=retrivedMessages.length;
            messageCount.innerHTML=messagesCount;
    
        }else{
            messageCount.innerHTML=messagesCount;;
        }
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
updateMessageCount();
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