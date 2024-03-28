const menu = document.getElementsByClassName("nav-links")[0];
const toggle = document.getElementById("toggle");

toggle.addEventListener("click",() => {
  menu.classList.toggle("visible");
});