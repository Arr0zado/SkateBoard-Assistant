/* SERVICE WORKER INDIANO QUE SUPOSTAMENTE FUNCIONA 80%*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('https://www.sk8pro.tk/js/sw_cached_page.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log('Service worker error:'));
  });
}

/*SCROLL TO TOP ANIMATION WHEN IN THE SAME PAGE*/
$('.choosen').on('click', function () {
  $('html, body').animate({
      scrollTop:0
  }, 1000);
});

//ADD NATIVE SMOTHNESS
turbolinks.start();


/* THEME
const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark"
};

const theme = localStorage.getItem('theme')
  || (tmp = Object.keys(themeMap)[0],
      localStorage.setItem('theme', tmp),
      tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem('theme');
  const next = themeMap[current];

  bodyClass.replace(current, next);
  localStorage.setItem('theme', next);
}

document.getElementById('themeButton').onclick = toggleTheme;
*/

