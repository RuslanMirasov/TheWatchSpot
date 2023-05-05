const openButton = document.querySelectorAll('[data-popup]');
const closeButton = document.querySelectorAll('[data-popup-close]');
const allPopups = document.querySelectorAll('.modal');
const modalBackdrop = document.querySelector('.backdrop');
const fixedElements = [].filter.call(document.all, e => getComputedStyle(e).position == 'fixed');
const body = document.querySelector('.body');
const bodyPadding = window.innerWidth - document.querySelector('.main').offsetWidth;

const forms = document.querySelectorAll('.form');
const inputs = document.querySelectorAll('input, textarea');

const addErrorText = false;
const minSymbols = 3;
const errorSymbols = 'Minimum characters!';
const errorEmptyInput = 'The field must not be empty!';
const errorNameInput = 'Only letters are allowed!';
const errorEmailInput = 'Wrong E-mail format!';
const errorPhoneInput = 'Wrong phone format!';
const errorMinNumber = 'The minimum value is';
const errorMaxNumber = 'The maximum value is';

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

// ----------------------------------------- FORM SEND AND VALIDATION

//CLEAN INPUT ON FOCUS
inputs.forEach(input => {
   input.addEventListener('focus', function () {
      this.classList.remove('red');
      // redInputs.forEach(redInput => {
      //    redInput.classList.remove('red');
      //    if (addErrorText == true && redInput.closest('.label').querySelector('.label__error') !== null) {
      //       redInput.closest('.label').querySelector('.label__error').classList.remove('active');
      //       setTimeout(function () {
      //          redInput.closest('.label').querySelector('.label__error').remove();
      //       }, 250);
      //    }
      // });
   });
});

//FORMS SUBMIT
forms.forEach(form => {
   form.addEventListener('submit', async function (event) {
      event.preventDefault();
      let answer = checkForm(this);
      if (answer != false) {
         popup('loading');
         const formData = new FormData(this);
         let dataArray = {};
         formData.forEach((value, key) => (dataArray[key] = value));
         let jsonData = JSON.stringify(dataArray);
         setTimeout(function () {
            popup('ok');
            formsReset();
            console.log(jsonData);
         }, 1500);
      }
      return false;
   });
});

//FORMS VALIDATION
function checkForm(formId) {
   let checker = true;
   formId.querySelectorAll('[required]').forEach(required => {
      let requiredInput = required;
      if (required.value.length === 0) {
         addError(required, errorEmptyInput);
      } else {
         if (requiredInput.value.length < minSymbols && requiredInput.type !== 'number') {
            let minSymbolsErrorText = errorSymbols.split(' ');
            addError(required, minSymbolsErrorText[0] + ' ' + minSymbols + ' ' + minSymbolsErrorText[1]);
         } else {
            //type Name
            if (requiredInput.name == 'name' && /[^A-zА-яЁё\+ ()\-]/.test(requiredInput.value)) {
               addError(required, errorNameInput);
            }
            //type email
            if (requiredInput.type == 'email' && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(requiredInput.value)) {
               addError(required, errorEmailInput);
            }
            //type tel
            if (requiredInput.type == 'tel' && /[^0-9\+ ()\-]/.test(requiredInput.value)) {
               addError(required, errorPhoneInput);
            }
            //type number
            if (requiredInput.type == 'number') {
               if (requiredInput.min && Number(requiredInput.value) < Number(requiredInput.min)) {
                  addError(required, errorMinNumber + ' ' + requiredInput.min);
               }
               if (requiredInput.max && Number(requiredInput.value) > Number(requiredInput.max)) {
                  addError(required, errorMaxNumber + ' ' + requiredInput.max);
               }
            }
         }
      }

      //ERROR TEXT CREATE
      function addError(correntLabel, text) {
         if (addErrorText === true) {
            let errors = correntLabel.querySelectorAll('.label__error').length;
            if (errors < 1) {
               correntLabel.insertAdjacentHTML('beforeend', '<div class="label__error">' + text + '</div>');
               setTimeout(function () {
                  correntLabel.querySelector('.label__error').classList.add('active');
               }, 5);
            }
         }
         checkerFalse();
      }

      //ADD "RED" CLASS TO INPUTS
      function checkerFalse() {
         requiredInput.classList.add('red');
         checker = false;
      }
   });
   return checker;
}

//OLL FORMS RESET
function formsReset() {
   forms.forEach(form => {
      form.reset();
      form.querySelectorAll('.label__error').forEach(errors => {
         errors.classList.remove('active');
         setTimeout(function () {
            errors.remove();
         }, 250);
      });
      form.querySelectorAll('[required]').forEach(required => {
         required.classList.remove('red');
      });
   });
}
