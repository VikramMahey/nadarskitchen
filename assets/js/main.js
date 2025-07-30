import { initHeader } from './header.js';
import { setupWhatsAppOrdering } from './order.js';
import { setupQuantityControls } from './quantity.js';
import { setupSmoothScroll } from './scroll.js';
// import { initHero } from './hero.js';
// import { initMenu } from './menu.js';
// import { initContact } from './contact.js';

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  setupQuantityControls();
  setupSmoothScroll();
  setupWhatsAppOrdering("919815235090");
   // ✅ Call it here
  // initHero();
  // initMenu();
  // initContact();
});
