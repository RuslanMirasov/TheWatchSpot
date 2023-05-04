const preloaderWrapper = document.querySelector('.preloader');
const preloaderProcent = document.querySelector('[data-preloader]');
const preloaderSvg = document.querySelector('.preloader__svg');
const mediaFiles = document.querySelectorAll('img, svg, video, audio');

let mediaFilesCount = 0;
window.addEventListener('load', preloaderHide);
mediaFiles.forEach(file => {
   file.onload = () => {
      mediaFilesCount += 1;
      preloaderProcent.innerHTML = ((mediaFilesCount * 100) / mediaFiles.length).toFixed() + '%';
      preloaderSvg.style.width = ((mediaFilesCount * 100) / mediaFiles.length).toFixed(1) + '%';
   };
});

function preloaderHide() {
   preloaderProcent.innerHTML = '100%';
   preloaderSvg.style.width = '100%';
   setTimeout(function () {
      preloaderWrapper.classList.add('is--hidden');
   }, 300);
}
