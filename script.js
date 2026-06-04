const btnBurger = document.getElementById('burger-btn');
const menuNav = document.getElementById('menu');

btnBurger.addEventListener('click', function(){
    menuNav.classList.toggle('tampil');
});