const nav = document.querySelector("nav");

window.addEventListener('scroll', () => {
  nav.classList.toggle("nav-active",window.scrollY>0);
});



