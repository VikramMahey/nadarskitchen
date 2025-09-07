import { setupQuantityControls } from './quantity.js';
import { setupWhatsAppOrdering } from "./order.js";



export function setupMenuRendering(jsonUrl) {
  const menuGrid = document.querySelector(".menu-grid");

  function toSentenceCase(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }


  function renderMenuItems(data) {
    menuGrid.innerHTML = "";

    const today = new Date().toLocaleString("en-US", { weekday: "long" });

    const availableDays = data
      .filter(item => item.status && item.status.toLowerCase() === "available")
      .map(item => item.day);


    data.forEach(item => {

      if (!item.day && !item.daal && !item.sabji && !item.price) {
        return;
      }

      const card = document.createElement("div");
      card.className = "menu-item-wrapper";

      let shouldHighlight = false;

      // Case 1: Today’s card → highlight unless "not available"
      if (item.day === today) {
        shouldHighlight = !(item.status && item.status.toLowerCase() === "not available");
      }

      // Case 2: If sheet marks this day as available → highlight too
      if (availableDays.includes(item.day)) {
        shouldHighlight = true;
      }

      if (shouldHighlight) {
        card.classList.add("highlight");
      }

      // Title → Daal + Sabji, both sentence case
      const combinedTitle = `${toSentenceCase(item.daal)} and  ${toSentenceCase(item.sabji)}`;

      // 👉 Dynamic snacks/dessert text
      let specialLine = "";
      const parts = [];

      if (item.snacks) parts.push(toSentenceCase(item.snacks));
      if (item.dessert) parts.push(toSentenceCase(item.dessert));

      if (parts.length > 0) {
        specialLine += parts.join(" ");
      } else {
        specialLine = ""; // don’t show if nothing
      }

      card.innerHTML = `
  <h4 class="menu-day">${item.day}</h4>
  <div class="menu-item">
    <span class="menu-price" data-base-price="${item.price}">${item.price} £</span>
    <span class="dish-tag">${item.tag}</span>
    <div class="image-wrapper">
      <img src="${item.image_url}" alt="${item.alt_text}" />
    </div>

    <!-- Row 1: info + actions -->
    <div class="menu-content-row">
      <div class="menu-info">
        <h3 class="menu-name">${combinedTitle}</h3>
        <p class="menu-description">${item.description || ""}</p>
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

    <!-- Row 2: special line across full width -->
    ${specialLine ? `<div class="menu-special-row"><p class="menu-special">Today’s special includes - <span>${specialLine}</span></p></div>` : ""}
  <!-- <div class="dish-rating">${item.rating}</div> -->
 
    </div>
`;


      if (!shouldHighlight) {
        const menuItem = card.querySelector(".menu-item");
        menuItem.setAttribute("data-wait-text", `⏳ Wait for ${item.day}`);
      }

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
