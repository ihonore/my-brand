const urlParams= new URLSearchParams(window.location.search);
var id= urlParams.get('id');
const blogSection=document.querySelector('.whole-blog-section');
const loading = document.querySelector('.loading');


const readyToAppend=document.createElement('div');

async function renderArticle(){
    
    const response= await fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/articles/${id}`)
    const fetchedResponse= await response.json()
    const article=fetchedResponse.data;

    let commentsCount=0;
    let date="";
    

    date=article.create_at.split('T')
    let finalDate=`${date[0]} / ${date[1].substring(0,5)}`
    

    commentsCount=article.comments.length;

        if (article) {

    let myArticle="";
    let template=` <article class="blog-details-section">
            <h2>${article.title}</h2>
            <p id="editor">By ihonore, <span class="blog-date">${finalDate}</span></p>
            <div class="blog-details-thumbnail">
                <img src=${article.image}>
            </div>
           <div class="main-content">
            <p>${article.content}</p>
           
            <div class="comment-div">
                <div class="comment-form" id="comment_form1">
                    <span>
                        <input type="text" class="comment1" id="comment1" required placeholder="Leave a comment">
                    </span>
                    <span>
                        <input type="text" class="name1" id="name1" required placeholder="Your name">
                    </span>
                    <span>
                        <button onClick='addComment("${article._id}")' class="comment-btn" id="comment-btn">comment</button>
                    </span>
                </div>
            </div>
           </div>

        </article>
        <div class="comments-section">
            <h3><span class="comment-counter">${commentsCount}</span>&nbsp;Comments</h3>
        </div>`
    myArticle=template;
    readyToAppend.innerHTML=myArticle;
    blogSection.appendChild(readyToAppend);
    renderComments();
    loading.style.display = 'none';

}
else{
    blogSection.innerHTML='<h2>No Article yet</h2>';

}
}

renderArticle()

const commentForm=document.getElementById('comment_form1');
const commentsReadyToAppend=document.createElement('div');

//Add comment function

async function addComment(article_id){
    const commentInput=document.getElementById('comment1');
    const nameInput=document.getElementById('name1');
    if(commentInput.value.trim()=="" && nameInput.value.trim()==""){
        nameInput.style.borderBottomColor='red';
        commentInput.style.borderBottomColor='red';
        
    }else if(commentInput.value.trim()==""){
        commentInput.style.borderBottomColor='red';
    }else if(nameInput.value.trim()==""){
        nameInput.style.borderBottomColor='red';
    }
    else{
        const commentBtn=document.getElementById('comment-btn')
        commentBtn.innerHTML += '&nbsp;<i class="fas fa-spinner fa-spin"></i>'
        let comment={
            commenter:nameInput.value,
            comment:commentInput.value
        };
        fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/comments/${article_id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comment)
        })
        .then(res => res.json())
        .then(() => {
            commentBtn.innerHTML="comment"
            renderArticle();

        })
    }
}


async function renderComments(){
    console.log(id);

    const response= await fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/comments/${id}`)
    const fetchedResponse= await response.json()
    const comments=fetchedResponse.data;

    const commentsSection=document.querySelector(".comments-section");


    if(comments){
        var commentsTemp = ""
            for (let i = 0; i < comments.length; i++) { 
              commentsTemp += `
              <p class="commentator">${comments[i].commenter}</p>
              <p class="comment">${comments[i].comment}</p>
              `;
            }

 commentsReadyToAppend.innerHTML=commentsTemp;
 commentsSection.appendChild(commentsReadyToAppend);
    }
    
}
