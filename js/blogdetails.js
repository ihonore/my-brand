const urlParams= new URLSearchParams(window.location.search);
const id= urlParams.get('id');
const blogSection=document.querySelector('.whole-blog-section');

// console.log(commentForm);


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
            <h3><span class="comment-counter">${commentsCount}</span>&nbsp;Comments</h3>
        </div>`
myArticle=template;
readyToAppend.innerHTML=myArticle;
blogSection.appendChild(readyToAppend);



}
else{
    blogSection.innerHTML='<h2>No Article yet</h2>';

}
}

renderArticle()

const commentForm=document.getElementById('comment_form1');
const commentInput=document.getElementById('comment1');
const nameInput=document.getElementById('name1');
const commentBtn=document.getElementById('comment-btn');
const commentsReadyToAppend=document.createElement('div');


// commentBtn.addEventListener('submit', (e) => {
    
//     e.preventDefault();
//     let comment={
//         commenter:nameInput.value,
//         comment:commentInput.value
//     };
//     fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/comments/${id}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(comment)
//         })
//         .then(res => res.json())
//         .then(() => {
//             renderComments();

//         })

//     //////
//     // e.preventDefault();
//     // let comment={
//     //     commentator:nameInput.value,
//     //     comment:commentInput.value
//     // };
//     // articles[id].comments.push(comment);
//     // articles[id].commentsCount+=1;
//     // renderComments();
//     // window.location.reload();
// });

async function renderComments(){

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
renderComments();