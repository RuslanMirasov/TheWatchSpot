const openButton = document.querySelectorAll('[data-popup]');
const closeButton = document.querySelectorAll('[data-popup-close]');
const allPopups = document.querySelectorAll('.modal');
const modalBackdrop = document.querySelector('.backdrop');
const fixedElements = [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed');
const body = document.querySelector('.body');
const bodyPadding = window.innerWidth - document.querySelector('.main').offsetWidth;

//MODAL OPEN BUTTON CLICK
openButton.forEach(btn => {
   btn.addEventListener('click', function (event) {
      event.preventDefault();
      popup(this.dataset.popup);
   });
});

//MODAL CLOSE BUTTON CLICK
closeButton.forEach(closeBtn => {
   closeBtn.addEventListener('click', modalClose);
});

//POPUP OPEN FUNCTION
function popup(id) {
   popupClose();
   if (modalBackdrop.classList.contains('is-hidden')) {
      modalBackdrop.classList.remove('is-hidden');
      scrollbarModify();
   }
   document.getElementById(id).classList.remove('is-hidden');
}

//POPUP CLOSE FUNCTION
function popupClose() {
   allPopups.forEach(popup => {
      popup.classList.add('is-hidden');
      setTimeout(function () {
         popup.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }, 300);
   });
}

//MODAL CLOSE FUNCTION
function modalClose() {
   popupClose();
   modalBackdrop.classList.add('is-hidden');
   setTimeout(function () {
      scrollbarModify();
      // formsReset();
   }, 300);
}

//SCROLL BAR MODIFY
function scrollbarModify() {
   body.classList.toggle('lock');
   fixedElements.forEach(fixedElement => {
      if (body.classList.contains('lock')) {
         body.style.paddingRight = bodyPadding + 'px';
         fixedElement.style.paddingRight = bodyPadding + 'px';
      } else {
         body.style.paddingRight = '0px';
         fixedElement.style.paddingRight = '0px';
      }
   });
}
