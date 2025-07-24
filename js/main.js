const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("main-nav");

toggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});
