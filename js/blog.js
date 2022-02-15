//Display added articles to my blog
const blogContainer=document.getElementById('blog-section');
const readyToAppend=document.createElement('div');

async function renderArticle(){

    const response= await fetch("https://ihonore-api-deploy.herokuapp.com/api/v1/articles")
    const fetchedResponse= await response.json()
    const articles=fetchedResponse.data;

    let commentsCount=0;
    let date="";

    let myArticles="";
    for(let i=articles.length-1; i>=0; i--) {

        date=articles[i].create_at.split('T')
        let finalDate=`${date[0]} / ${date[1].substring(0,5)}`

        commentsCount=articles[i].comments.length;

    let template=` <div class="blog-container">
    <div class="blog-thumbnail">
        <img src="${articles[i].image}" alt="Artical thumbnail">
    </div>
    <div class="blog-content">
        <div class="editor-and-time">
            <span class="editor">Edited by Honore</span>
            <span class="time">Published at: ${finalDate}</span>
        </div>
        <div class="blog-body">
            <h3>${articles[i].title}</h3>
            <p>${articles[i].content.substring(0,250)}&nbsp;<a href="/pages/blogdetails.html?id=${i}" class="read-more">Read more</a></p>   
        </div>
        <div class="likes-and-comments">
            <div class="likes">
              <span onclick="like(${i})"><i class="far fa-thumbs-up"></i></span>
              <span class="likes-counter">${0}</span>
           </div>
           <div class="comments" id="commentsSection">
           <a href="/pages/blogdetails.html?id=${i}#commentsSection"> <span  onclick="comment(${i})"><i class="far fa-comments"></i></span></a>
               <span class="comments-counter">${commentsCount}</span>
            </div>
        </div>
    </div>
</div>`

myArticles+=template;
 }

    readyToAppend.innerHTML=myArticles
    blogContainer.appendChild(readyToAppend);
}

//Likes function
// const liker=document.getElementsByClassName('far fa-thumbs-up');

// function like(index){
//     let retrieved=JSON.parse(localStorage.getItem('articles'));
    
//     if(liker[0].classList.contains('liked')){
//         retrieved[index].likesCount-=1;
//         liker[0].classList.toggle('liked');
//     }
//     else{
//         retrieved[index].likesCount+=1;
//         liker[0].classList.toggle('liked');
//     }

//     localStorage.setItem('articles',JSON.stringify(retrieved));
//     renderArticle();

// }

renderArticle();