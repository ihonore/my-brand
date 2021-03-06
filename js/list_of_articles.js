var allArticles=document.querySelector('.all-articles');
let readyToAppend=document.createElement('div');
const loading = document.querySelector('.loading');

let img=document.createElement('img');

let h4=document.createElement('h4');
let p=document.createElement('p');
let bodyParagraph=document.createElement('p');

const token = localStorage.getItem('token')

var articles;

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
                <span title="Edit" onClick='editArticle("${element._id}")'><i class="fas fa-edit"></i></span>
                <span title="Delete" onClick='deleteArticle("${element._id}")'><i class="far fa-trash-alt"></i></span>
            </div>
        </div>    
    </a>`

     myArticles+=template;
    })
    readyToAppend.innerHTML=myArticles
    allArticles.appendChild(readyToAppend);
    loading.style.display = 'none';
}


//Creating, updating and deleting article

const formContainer = document.querySelector('.form-container');
const createBtn = document.querySelector('.create');
const closeModal = document.querySelector('.close-modal');
const addArticleForm = document.querySelector('.add-article-wrapper');
const title = document.querySelector('#article_title');
const description = document.querySelector('#article_content');
const image = document.querySelector('#media-url');
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

        
imageInput.addEventListener("click", ()=>{
  image.style.visibility='hidden';
  image.value="";
});

addArticleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
   
    //check if all fields are filled
    if (!title.value || !description.value || !(image.value || imageInput.value)) {
      alert.style.display = 'block';
      alert.style.backgroundColor = 'rgba(255,0,0,0.7)';
      alert.style.color = '#fff';
      alert.innerHTML = `Please fill all the fields`;
    } else {
      addArticleBtn.innerHTML += '&nbsp;<i class="fas fa-spinner fa-spin"></i>';
      addArticleBtn.setAttribute('disabled','disabled');
      addArticleBtn.style.background='#72b4ee';

      await fetch('https://ihonore-api-deploy.herokuapp.com/api/v1/articles', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
      },
        body: new FormData(addArticleForm)
      })
      .then(res => res.json())
      .then(data => {
          if (data.status == 201){
            alert.style.display = 'block';
            alert.innerHTML = `Article added successfully`;
            addArticleBtn.innerHTML = 'Add Article';
            addArticleBtn.removeAttribute('disabled');
            addArticleBtn.style.background='#0c4a80'
          }
        })
        .then(()=>{
          setTimeout(() => {
            formContainer.classList.toggle('open-modal');
            window.location.reload();
            }, 2000);
        })
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
    confirmOkBtn.addEventListener('click', async()=>{
      confirmOkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        const response= await fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/articles/${id}`,{
            method:'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const fetchedResponse= await response.json()
        console.log(fetchedResponse);
        confirmOkBtn.innerHTML = 'Ok';
        confirmDiv.style.display="none";
        renderArticles();
    });
}

renderArticles();

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

    updateArticleBtn.addEventListener('click',async (e)=>{
        e.preventDefault();
        updateArticleBtn.style.width='11rem'
        updateArticleBtn.innerHTML += '<i class="fas fa-spinner fa-spin"></i>';
        updateArticleBtn.setAttribute('disabled','disabled');
        updateArticleBtn.style.background='#72b4ee';

        fetch(`https://ihonore-api-deploy.herokuapp.com/api/v1/articles/${articleId}`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: new FormData(addArticleForm)
        })
        .then(res => res.json())
        .then(data => {
          if (data.status == 200){
            updateArticleBtn.innerHTML = 'Update Article';
            updateArticleBtn.style.background='#0c4a80'
            updateArticleBtn.removeAttribute('disabled');
            alert.style.display = 'block';
            alert.style.backgroundColor='lightgreen';
            alert.innerHTML = `Article updated successfully`;
          }
        }).then(()=>{
          setTimeout(() => {
            formContainer.classList.toggle('open-modal');
            window.location.reload();
            }, 2000);
        })   
    })
}
