export function setupSmoothScroll() {
  window.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    links.forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          const header = document.querySelector('.site-header');
          const headerHeight = header?.offsetHeight || 0;
          const buffer = 0; // space below header after scroll

          const startY = window.scrollY;
          const elementY = targetElement.getBoundingClientRect().top + startY;
          const offsetY = elementY - headerHeight - buffer;

          smoothScrollTo(startY, offsetY, 700); // 800ms scroll duration

          // Optional: close mobile nav
          const navToggle = document.getElementById('nav-toggle');
          const nav = document.querySelector('.nav');
          if (navToggle?.classList.contains('open')) {
            navToggle.classList.remove('open');
            nav?.classList.remove('open');
          }
        }
      });
    });


    // Handle case when page loads with a hash (from another page)
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        const header = document.querySelector('.site-header');
        const headerHeight = header?.offsetHeight || 0;
        const buffer = 0;

        // Force scroll to top first to prevent instant jump
        window.scrollTo(0, 0);

        const startY = 0;
        const elementY = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetY = elementY - headerHeight - buffer;

        // Delay slightly to allow layout to settle
        setTimeout(() => {
          smoothScrollTo(startY, offsetY, 700);
        }, 100);
      }
    }
  });
}

function smoothScrollTo(start, end, duration) {
  const distance = end - start;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}



