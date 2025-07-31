import { initHeader } from './header.js';
import { setupWhatsAppOrdering } from './order.js';
import { setupQuantityControls } from './quantity.js';
import { setupSmoothScroll } from './scroll.js';
import { setupMenuRendering } from './menu.js';


const menuJsonUrl = 'https://script.google.com/macros/s/AKfycbyBTQYFNNdKq7QZp54LgpFnOc47CZ4VKqsJZ7rBRKIUx1c0DgwQgbjE9S1WPIkY6xJwuA/exec';


// const brokenUrl = "https://invalid-url.example.com/data";
// import { initHero } from './hero.js';
// import { initMenu } from './menu.js';
// import { initContact } from './contact.js';

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  setupQuantityControls();
  setupSmoothScroll();
  setupWhatsAppOrdering("919815235090");
  
// setupMenuRendering(brokenUrl);
  setupMenuRendering(menuJsonUrl);
   // ✅ Call it here
  // initHero();
  // initMenu();
  // initContact();
});
