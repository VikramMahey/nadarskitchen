import { setupQuantityControls } from './quantity.js';
import { setupWhatsAppOrdering } from "./order.js";



export function setupMenuRendering(jsonUrl) {
  const menuGrid = document.querySelector(".menu-grid");

  // Helper to render menu items
  function renderMenuItems(data) {
    menuGrid.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "menu-item";
      card.innerHTML = `
        <span class="menu-price" data-base-price="${item.price}">${item.price} £</span>
        <span class="dish-tag">${item.tag}</span>
        <div class="image-wrapper">
          <img src="${item.image_url}" alt="${item.alt_text}" />
        </div>

        <div class="menu-content-row">
          <div class="menu-info">
            <h3 class="menu-name">${item.name}</h3>
            <p class="menu-description">${item.description}</p>
            <div class="dish-rating">${item.rating}</div>
          </div>

          <div class="menu-actions">
            <div class="quantity-wrapper">
              <label>Select Quantity</label>
              <div class="qty-control">
                <button class="qty-btn minus">–</button>
                <input type="number" class="order-qty" min="1" value="1" />
                <button class="qty-btn plus">+</button>
              </div>
            </div>
            <button class="order-button">Order Now</button>
          </div>
        </div>
      `;
      menuGrid.appendChild(card);
    });

    setupQuantityControls();
    setupWhatsAppOrdering("919815235090");
  }

  // Load cached data immediately (if available)
  const cachedData = localStorage.getItem("cachedMenu");
  if (cachedData) {
    try {
      renderMenuItems(JSON.parse(cachedData));
    } catch (err) {
      console.error("Failed to parse cached menu data:", err);
    }
  }

  // Fetch fresh data (with cache busting)
  fetch(`${jsonUrl}?_=${Date.now()}`)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem("cachedMenu", JSON.stringify(data));
      renderMenuItems(data);
    })
    // .catch(err => {
    //   console.error("Error loading menu:", err);
    //   if (!cachedData) {
    //     menuGrid.innerHTML = "<p>Failed to load menu. Please try again later.</p>";
    //   }
    // });

    .catch(err => {
      console.error("Error loading menu:", err);

      if (!cachedData) {
        menuGrid.innerHTML = `
            <div class="menu-item">
          <span class="menu-price" data-base-price="20">20 £</span>
          <span class="dish-tag">Spicy</span>
          <div class="image-wrapper">
            <img src="images/menu/dish-1.png" alt="Grilled Paneer Tikka" />
          </div>

          <div class="menu-content-row">
            <div class="menu-info">
              <h3 class="menu-name">Grilled Paneer Tikka</h3>
              <p class="menu-description">Smoky marinated paneer grilled to perfection.</p>
              <div class="dish-rating">★★★★☆ 4.2</div>
            </div>

            <div class="menu-actions">
              <div class="quantity-wrapper">
                <label>Select Quantity</label>
                <div class="qty-control">
                  <button class="qty-btn minus">–</button>
                  <input type="number" class="order-qty" min="1" value="1" />
                  <button class="qty-btn plus">+</button>
                </div>
              </div>

              <button class="order-button">Order Now</button>
            </div>

          </div>


        </div>
    `;

        setupQuantityControls();
        setupWhatsAppOrdering("919815235090");
      }
    });



}
