const menuToggleElements = document.querySelectorAll('[data-menuToggle]');
const menuCloseElements = document.querySelectorAll('[data-menuClose]');
const burger = document.querySelector('.js-burger');
const mobilMenu = document.querySelector('.header-navigation');

menuToggleElements.forEach(menuToggleTrigger => {
   menuToggleTrigger.addEventListener('click', function () {
      burger.classList.toggle('is-open');
      mobilMenu.classList.toggle('is-open');
   });
});

menuCloseElements.forEach(menuCloseTrigger => {
   menuCloseTrigger.addEventListener('click', function () {
      burger.classList.remove('is-open');
      mobilMenu.classList.remove('is-open');
   });
});
