//Display added articles to my blog
const blogContainer=document.getElementById('blog-section');
const readyToAppend=document.createElement('div');

function renderArticle(){
    retrievedArticles = JSON.parse( localStorage.getItem('articles'));
        if( retrievedArticles=== null){
            articles = [];
    
        }else{
            articles = retrievedArticles;
        }
    let myArticles="";
    for(let i=articles.length-1; i>=0; i--) {
    let template=` <div class="blog-container">
    <div class="blog-thumbnail">
        <img src="${articles[i].imageUrl}" alt="Artical thumbnail">
    </div>
    <div class="blog-content">
        <div class="editor-and-time">
            <span class="editor">Edited by Honore</span>
            <span class="time">Published at: ${articles[i].timePublished}</span>
        </div>
        <div class="blog-body">
            <h3>${articles[i].title}</h3>
            <p>${articles[i].body.substring(0,250)}&nbsp;<a href="/pages/blogdetails.html?id=${i}" class="read-more">Read more</a></p>   
        </div>
        <div class="likes-and-comments">
            <div class="likes">
              <span onclick="like(${i})"><i class="far fa-thumbs-up"></i></span>
              <span class="likes-counter">${articles[i].likesCount}</span>
           </div>
           <div class="comments" id="commentsSection">
           <a href="/pages/blogdetails.html?id=${i}#commentsSection"> <span  onclick="comment(${i})"><i class="far fa-comments"></i></span></a>
               <span class="comments-counter">${articles[i].commentsCount}</span>
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
const liker=document.getElementsByClassName('far fa-thumbs-up');

function like(index){
    let retrieved=JSON.parse(localStorage.getItem('articles'));
    
    if(liker[0].classList.contains('liked')){
        retrieved[index].likesCount-=1;
        liker[0].classList.toggle('liked');
    }
    else{
        retrieved[index].likesCount+=1;
        liker[0].classList.toggle('liked');
    }

    localStorage.setItem('articles',JSON.stringify(retrieved));
    renderArticle();

}

renderArticle();