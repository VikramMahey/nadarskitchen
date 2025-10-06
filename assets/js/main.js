import { initHeader } from './header.js';
import { setupWhatsAppOrdering } from './order.js';
import { setupQuantityControls } from './quantity.js';
import { setupSmoothScroll } from './scroll.js';
import { setupMenuRendering } from './menu.js';
import { setupTestimonialsCarousel } from './testimonial.js';
import { setupContactForm } from './contact.js';






const menuJsonUrl = 'https://script.google.com/macros/s/AKfycbyBTQYFNNdKq7QZp54LgpFnOc47CZ4VKqsJZ7rBRKIUx1c0DgwQgbjE9S1WPIkY6xJwuA/exec';


// const brokenUrl = "https://invalid-url.example.com/data";
// import { initHero } from './hero.js';
// import { initMenu } from './menu.js';
// import { initContact } from './contact.js';

// document.addEventListener("DOMContentLoaded", () => {
//   initHeader();
//   setupQuantityControls();
//   setupSmoothScroll();
//   setupTestimonialsCarousel();
//   setupWhatsAppOrdering("919815235090");

//   // setupMenuRendering(brokenUrl);
//   setupMenuRendering(menuJsonUrl);
//   setupContactForm();
// });
// main.js
function initSite() {
  initHeader();
  setupQuantityControls();
  setupSmoothScroll();
  setupTestimonialsCarousel();
  setupWhatsAppOrdering("919815235090");
  setupMenuRendering(menuJsonUrl);
  setupContactForm();
  // Run the sitemap generator
  generateSitemap();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  // DOM already loaded
  initSite();
}
