const slideCounter = document.querySelector('.slide-first');
var swiper = new Swiper('.hero-slider', {
   speed: 600,
   loop: true,
   autoplay: {
      enabled: true,
      delay: 3000,
      disableOnInteraction: false,
   },
   navigation: {
      nextEl: '.swiper-next',
      prevEl: '.swiper-back',
   },
});
swiper.on('slideChange', function () {
   let count = this.realIndex + 1;
   slideCounter.innerHTML = '0' + count;
});
