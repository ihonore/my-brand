const urlParams= new URLSearchParams(window.location.search);
const id= urlParams.get('id');
const blogSection=document.querySelector('.whole-blog-section');

// console.log(commentForm);


const readyToAppend=document.createElement('div');

function renderArticle(){
    retrievedArticles = JSON.parse( localStorage.getItem('articles'));
        if( retrievedArticles=== null){
            articles = [];
    
        }else{
            articles = retrievedArticles;
        }
        if (articles[id]) {

    let myArticle="";
    let template=` <article class="blog-details-section">
            <h2>${articles[id].title}</h2>
            <p id="editor">By ihonore, <span class="blog-date">${articles[id].timePublished}</span></p>
            <div class="blog-details-thumbnail">
                <img src=${articles[id].imageUrl}>
            </div>
           <div class="main-content">
            <p>${articles[id].body}</p>
           
            <div class="comment-div">
                <form class="comment-form" id="comment_form1">
                    <span>
                        <input type="text" class="comment1" id="comment1" required placeholder="Leave a comment">
                    </span>
                    <span>
                        <input type="text" class="name1" id="name1" required placeholder="Your name">
                    </span>
                    <span>
                        <button type="submit" class="comment-btn" id="comment-btn">comment</button>
                    </span>
                </form>
            </div>
           </div>

        </article>
        <div class="comments-section">
            <h3><span class="comment-counter">${articles[id].commentsCount}</span>&nbsp;Comments</h3>
        </div>`
myArticle=template;
readyToAppend.innerHTML=myArticle;
blogSection.appendChild(readyToAppend);



}
else{
    blogSection.innerHTML='<h2>No Article yet</h2>';

}
}

renderArticle();
const commentForm=document.getElementById('comment_form1');
const commentsSection=document.querySelector(".comments-section");
const commentInput=document.getElementById('comment1');
const nameInput=document.getElementById('name1');
const commentBtn=document.getElementById('comment-btn');
const commentsReadyToAppend=document.createElement('div');

commentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let comment={
        commentator:nameInput.value,
        comment:commentInput.value
    };
    articles[id].comments.push(comment);
    articles[id].commentsCount+=1;
    renderComments();
    window.location.reload();
});

function renderComments(){
    var comments = ""
            for (let i = 0; i < articles[id].comments.length; i++) { 
              comments += `
              <p class="commentator">${articles[id].comments[i].commentator}</p>
              <p class="comment">${articles[id].comments[i].comment}</p>
              `;
            }
 localStorage.setItem("articles", JSON.stringify(articles));
 commentsReadyToAppend.innerHTML=comments;
 commentsSection.appendChild(commentsReadyToAppend);
}
renderComments();