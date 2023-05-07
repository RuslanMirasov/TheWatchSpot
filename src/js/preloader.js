AOS.init();
const preloader = document.querySelector('.preloader');
window.addEventListener('load', () => {
   setTimeout(function () {
      preloader.classList.add('is--hidden');
   }, 500);
});
