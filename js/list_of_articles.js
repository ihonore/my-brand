var allArticles=document.querySelector('.all-articles');
let readyToAppend=document.createElement('div');

let img=document.createElement('img');

let h4=document.createElement('h4');
let p=document.createElement('p');
let bodyParagraph=document.createElement('p');

const token = localStorage.getItem('token')


//formatting date and time of when article is added
let t = new Date();
let date = ('0' + t.getDate()).slice(-2);
let month = ('0' + (t.getMonth() + 1)).slice(-2);
let year = t.getFullYear();
let hours = ('0' + t.getHours()).slice(-2);
let minutes = ('0' + t.getMinutes()).slice(-2);
let seconds = ('0' + t.getSeconds()).slice(-2);
var time = `${date}-${month}-${year}, ${hours}:${minutes}`;

var retrievedArticles;
var articles;
// var localID=0;
// localStorage.setItem('localid',localID);

//Display articles function

async function renderArticles(){
    const response= await fetch("https://ihonore-api-deploy.herokuapp.com/api/v1/articles")
    const fetchedResponse= await response.json()
    const articles=fetchedResponse.data;

    let myArticles="";
    let date=""
    articles.forEach((element) => {

        date=element.create_at.split('T')
        let finalDate=`${date[0]} / ${date[1].substring(0,5)}`

    let template=`<a href="#" data-id="${
            element._id
          }" >
        <div class="article-wrapper">
            <div class="article-thumbnail">
                <img src="${element.image}" alt="Article Image">
            </div>
            <div class="article">
                <h4>${element.title}</h4>
                <p>${element.content.substring(0,200)} . . .</p>  
            </div>
            <div class="actions">
                <p>Created ${finalDate}</p>
                <span onClick='editArticle("${element._id}")'><i class="fas fa-edit"></i></span>
                <span onClick='deleteArticle("${element._id}")'><i class="far fa-trash-alt"></i></span>
            </div>
        </div>    
    </a>`

     myArticles+=template;
    })
    readyToAppend.innerHTML=myArticles
    allArticles.appendChild(readyToAppend);
}


//Creating, updating and deleting article

const formContainer = document.querySelector('.form-container');
const createBtn = document.querySelector('.create');
const closeModal = document.querySelector('.close-modal');
const addArticleForm = document.querySelector('.add-article-wrapper');
const title = document.querySelector('#article_title');
const description = document.querySelector('#article_content');
const image = document.querySelector('#media-url');
// const imageInput=document.getElementById('chosen-image');
const imageInput=document.getElementById("chosen-image");
const addArticleBtn = document.querySelector('.add-btn');
const alert = document.querySelector('.alert');
const updateArticleBtn = document.querySelector('.update-btn');

//open modal when create article button is clicked
createBtn.addEventListener('click', () => {
    updateArticleBtn.style.display = 'none';
    formContainer.classList.toggle('open-modal');
  });

//close modal when cancel button is clicked
closeModal.addEventListener('click', () => {
    formContainer.classList.toggle('open-modal');
  });


//lets first convert Image chosen file into a string url
        
imageInput.addEventListener("click", ()=>{
  image.style.visibility='hidden';
  image.value="";
});

var chosenImage;
imageInput.addEventListener('change',function(){
    const fileReader= new FileReader();

    fileReader.addEventListener('load',() =>{
        chosenImage=fileReader.result;
        image.value=chosenImage;
    })
    fileReader.readAsDataURL(this.files[0]);
});

//Add aticle when form is submitted and validated

addArticleForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    //check if all fields are filled
    if (!title.value || !description.value || !(image.value || imageInput.value)) {
      alert.style.display = 'block';
      alert.style.backgroundColor = 'rgba(255,0,0,0.7)';
      alert.style.color = '#fff';
      alert.innerHTML = `Please fill all the fields`;
    } else {

        retrievedArticles = JSON.parse( localStorage.getItem('articles'));
        if( retrievedArticles=== null){
            articles = [];
    
        }else{
            articles = retrievedArticles;
        }


    var finalImageUrl=(chosenImage)?chosenImage:image.value;
  
      var thisArticle = {
          title: title.value,
          imageUrl: finalImageUrl,
          body: description.value,
          timePublished:time,
          comments: [],
          commentsCount: 0,
          likesCount: 0
      };

      articles.push(thisArticle);
      localStorage.setItem('articles',JSON.stringify(articles));

      retrievedArticles=JSON.parse(localStorage.getItem('articles'));
      console.log(retrievedArticles);
      
      addArticleBtn.innerHTML += '&nbsp;<i class="fas fa-spinner fa-spin"></i>';
      addArticleBtn.setAttribute('disabled','disabled');
      addArticleBtn.style.cursor='wait';
      addArticleBtn.style.background='#72b4ee';
      renderArticles();


    alert.style.display = 'block';
    alert.innerHTML = `Article added successfully`;
    addArticleBtn.innerHTML = 'Add Article';
    addArticleBtn.removeAttribute('disabled');
  
    //close modal when successful added
    setTimeout(() => {
        formContainer.classList.toggle('open-modal');
        window.location.reload();
      }, 2000);
    }
  });




const editBtns = document.querySelectorAll('.fa-edit');
const deleteBtns = document.querySelectorAll('.fa-trash-alt');

const confirmDiv=document.querySelector('.overlay-articles');
const confirmOkBtn=document.getElementById('ok');
const confirmCancelBtn=document.getElementById('no');

  //delete article function

function deleteArticle(id){

    confirmDiv.style.display="block";
        
    confirmCancelBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        confirmDiv.style.display="none";
    });
    confirmOkBtn.addEventListener('click',async()=>{

        const response= await fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/articles/${id}`,{
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const fetchedResponse= await response.json()
        console.log(fetchedResponse);
        confirmDiv.style.display="none";
        renderArticles();
    });
}

renderArticles();

// let articleId = updateArticleBtn.parentNode.parentNode.getAttribute("data-id");
// console.log(articleId);

//update article function
async function editArticle(articleId){

    const response= await fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/articles/${articleId}`)
    const fetchedResponse= await response.json()
    const article=fetchedResponse.data;


    addArticleBtn.style.display = 'none';
    
    title.value = article.title;
    description.value = article.content;
    image.value = article.image;
    formContainer.classList.toggle('open-modal');
    
    finalImageUrl=(chosenImage)?chosenImage:image.value;
    console.log(`this is final imageUrl ${finalImageUrl}`);

    updateArticleBtn.addEventListener('click',async (e)=>{
        e.preventDefault();
        let updatedArticle={}

        updatedArticle.title=title.value;
        updatedArticle.body=description.value;
        updatedArticle.imageUrl=image.value;

        fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/articles/${articleId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(updatedArticle)
        })
        .then(res => res.json())
        .then(data => {
          if (data.status == 200){
            alert.style.display = 'block';
            alert.style.backgroundColor='lightgreen';
            alert.innerHTML = `Article updated successfully`;
          }
          
          formContainer.classList.toggle('open-modal');
          renderArticles();

        })

        /////
     
    //  localStorage.setItem('articles',JSON.stringify(retrieved));

    

    // setTimeout(() => {
    // formContainer.classList.toggle('open-modal');
    // window.location.reload();
    // }, 2000);
     
    })
}
