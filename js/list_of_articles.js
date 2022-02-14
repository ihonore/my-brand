var allArticles=document.querySelector('.all-articles');
let readyToAppend=document.createElement('div');

let img=document.createElement('img');

let h4=document.createElement('h4');
let p=document.createElement('p');
let bodyParagraph=document.createElement('p');


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
var localID=0;
localStorage.setItem('localid',localID);

//Display articles function

function renderArticle(){
    retrievedArticles = JSON.parse( localStorage.getItem('articles'));
        if( retrievedArticles=== null){
            articles = [];
    
        }else{
            articles = retrievedArticles;
        }
    let myArticles="";
    articles.forEach((element,index) => {
    let template=`<a href="#" data-id=${
            index
          } >
        <div class="article-wrapper">
            <div class="article-thumbnail">
                <img src="${element.imageUrl}" alt="Article Image">
            </div>
            <div class="article">
                <h4>${element.title}</h4>
                <p>${element.body.substring(0,200)} . . .</p>  
            </div>
            <div class="actions">
                <p>Created ${element.timePublished}</p>
                <span onClick='editArticle(${index})'><i class="fas fa-edit"></i></span>
                <span onClick='deleteArticle(${index})'><i class="far fa-trash-alt"></i></span>
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
      renderArticle();


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


  //delete article function

  const editBtns = document.querySelectorAll('.fa-edit');
  const deleteBtns = document.querySelectorAll('.fa-trash-alt');

const confirmDiv=document.querySelector('.overlay-articles');
const confirmOkBtn=document.getElementById('ok');
const confirmCancelBtn=document.getElementById('no');


function deleteArticle(index){
confirmDiv.style.display="block";
    
confirmCancelBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    confirmDiv.style.display="none";
});
confirmOkBtn.addEventListener('click',()=>{
  let retrieved=JSON.parse(localStorage.getItem('articles'));
  retrieved.splice(index,1);
  console.log(retrieved);
  localStorage.setItem('articles',JSON.stringify(retrieved));
  confirmDiv.style.display="none";
  renderArticle();
});
}

renderArticle();

//update article function
function editArticle(index){
    addArticleBtn.style.display = 'none';
    let retrieved=JSON.parse(localStorage.getItem('articles'));
    title.value = retrieved[index].title;
    description.value = retrieved[index].body;
    image.value = retrieved[index].imageUrl;
    formContainer.classList.toggle('open-modal');
    
    finalImageUrl=(chosenImage)?chosenImage:image.value;
    console.log(`this is final imageUrl ${finalImageUrl}`);
    updateArticleBtn.addEventListener('click',(e)=>{
        e.preventDefault();
     retrieved[index].title=title.value;
     retrieved[index].body=description.value;
     retrieved[index].imageUrl=image.value;
     localStorage.setItem('articles',JSON.stringify(retrieved));

    alert.style.display = 'block';
    alert.style.backgroundColor='lightgreen';
    alert.innerHTML = `Article updated successfully`;

    setTimeout(() => {
    formContainer.classList.toggle('open-modal');
    window.location.reload();
    }, 2000);
     
    })
}
