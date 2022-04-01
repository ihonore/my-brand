/////////////////Mobile Menu Section/////////////////
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');
const loginAncor=document.querySelector('#login-page')


//check if there is a logged in user
const token=localStorage.getItem('token')
const currentUser=localStorage.getItem('currentUser')
if(currentUser && token){
  loginAncor.textContent="Logout"
  loginAncor.removeAttribute('href')
  loginAncor.classList.toggle('logout')
}

// Display Humburger menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Close Humburger menu when clicked on item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);


