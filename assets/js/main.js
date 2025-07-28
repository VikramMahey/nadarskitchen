import { initHeader } from './header.js';
import { setupWhatsAppOrdering } from './order.js';
// import { initHero } from './hero.js';
// import { initMenu } from './menu.js';
// import { initContact } from './contact.js';

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  setupWhatsAppOrdering("919815235090"); // ✅ Call it here
  // initHero();
  // initMenu();
  // initContact();
});
