export function initHeader() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("open"); // ✅ Add this
  });

  document.addEventListener("click", (event) => {
    const isClickInsideToggle = toggle.contains(event.target);
    const isClickInsideNav = nav.contains(event.target);

    if (nav.classList.contains("open") && !isClickInsideToggle && !isClickInsideNav) {
      nav.classList.remove("open");
      toggle.classList.remove("open"); // ✅ Close toggle state
    }
  });
}
