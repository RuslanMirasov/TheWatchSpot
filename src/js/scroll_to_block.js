const scrollLinks = document.querySelectorAll('[data-scrollto]');
const header = document.querySelector('.header');

scrollLinks.forEach(link => {
   link.addEventListener('click', function (event) {
      event.preventDefault();
      let distance = document.querySelector('.' + this.dataset.scrollto).offsetTop - header.getBoundingClientRect().height;
      window.scrollTo({ top: distance, left: 0, behavior: 'smooth' });
      // if (menu.classList.contains('is-open')) {
      //    menuToggle();
      // }
   });
});
