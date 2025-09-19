// assets/js/header.js
function initHeader() {
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("open");
  });
  document.addEventListener("click", (event) => {
    const isClickInsideToggle = toggle.contains(event.target);
    const isClickInsideNav = nav.contains(event.target);
    if (nav.classList.contains("open") && !isClickInsideToggle && !isClickInsideNav) {
      nav.classList.remove("open");
      toggle.classList.remove("open");
    }
  });
}

// assets/js/order.js
function setupWhatsAppOrdering(kitchenNumber) {
  document.querySelectorAll(".order-button").forEach((button) => {
    button.addEventListener("click", function() {
      var _a, _b, _c;
      const menuItem = this.closest(".menu-item");
      if (!menuItem)
        return;
      const name = ((_a = menuItem.querySelector(".menu-name")) == null ? void 0 : _a.textContent.trim()) || "Unknown Dish";
      const description = ((_b = menuItem.querySelector(".menu-description")) == null ? void 0 : _b.textContent.trim()) || "";
      const special = ((_c = menuItem.querySelector(".menu-special span")) == null ? void 0 : _c.textContent.trim()) || "";
      const qtyInput = menuItem.querySelector(".order-qty");
      const quantity = parseInt(qtyInput == null ? void 0 : qtyInput.value) || 1;
      const priceEl = menuItem.querySelector(".menu-price");
      const basePrice = parseFloat(priceEl == null ? void 0 : priceEl.dataset.basePrice) || 0;
      const totalPrice = basePrice * quantity;
      const formattedTotal = Number.isInteger(totalPrice) ? `${totalPrice}` : `${totalPrice.toFixed(2)}`;
      const imgElement = menuItem.querySelector("img");
      const imgSrc = imgElement == null ? void 0 : imgElement.getAttribute("src");
      const img = imgSrc ? `${window.location.origin}/${imgSrc}` : "";
      const message = `Hi! I'd like to place an order.

Dish: ${name}
Description: ${description}
${special ? `Special: ${special}` : ""}
Quantity: ${quantity}
Price per unit: ${basePrice} \xA3
Total: ${formattedTotal} \xA3
${img ? `Image: ${img}` : ""}
Please confirm. Thanks!`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${kitchenNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    });
  });
}

// assets/js/quantity.js
function setupQuantityControls() {
  document.querySelectorAll(".quantity-wrapper").forEach((wrapper) => {
    const minusBtn = wrapper.querySelector(".qty-btn.minus");
    const plusBtn = wrapper.querySelector(".qty-btn.plus");
    const qtyInput = wrapper.querySelector(".order-qty");
    if (!minusBtn || !plusBtn || !qtyInput)
      return;
    const menuItem = wrapper.closest(".menu-item");
    const priceEl = menuItem == null ? void 0 : menuItem.querySelector(".menu-price");
    const basePrice = parseFloat(priceEl == null ? void 0 : priceEl.dataset.basePrice);
    if (!priceEl || isNaN(basePrice))
      return;
    const updatePrice = () => {
      const qty = parseInt(qtyInput.value) || 1;
      const total = basePrice * qty;
      const formattedPrice = Number.isInteger(total) ? `${total}` : `${total.toFixed(2)}`;
      priceEl.textContent = `${formattedPrice} \xA3`;
    };
    plusBtn.addEventListener("click", () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
      updatePrice();
    });
    minusBtn.addEventListener("click", () => {
      if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
        updatePrice();
      }
    });
    updatePrice();
  });
}

// assets/js/scroll.js
function setupSmoothScroll() {
  window.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    links.forEach((link) => {
      link.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const header = document.querySelector(".site-header");
          const headerHeight = (header == null ? void 0 : header.offsetHeight) || 0;
          const buffer = 0;
          const startY = window.scrollY;
          const elementY = targetElement.getBoundingClientRect().top + startY;
          const offsetY = elementY - headerHeight - buffer;
          smoothScrollTo(startY, offsetY, 800);
          const navToggle = document.getElementById("nav-toggle");
          const nav = document.querySelector(".nav");
          if (navToggle == null ? void 0 : navToggle.classList.contains("open")) {
            navToggle.classList.remove("open");
            nav == null ? void 0 : nav.classList.remove("open");
          }
        }
      });
    });
  });
}
function smoothScrollTo(start, end, duration) {
  const distance = end - start;
  let startTime = null;
  function animation(currentTime) {
    if (!startTime)
      startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, start + distance * ease);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
}

// assets/js/menu.js
function setupMenuRendering(jsonUrl) {
  const menuGrid = document.querySelector(".menu-grid");
  function toSentenceCase(str) {
    if (!str)
      return "";
    return str.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  function renderMenuItems(data) {
    menuGrid.innerHTML = "";
    const today = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { weekday: "long" });
    const availableDays = data.filter((item) => item.status && item.status.toLowerCase() === "available").map((item) => item.day);
    data.forEach((item) => {
      if (!item.day && !item.daal && !item.sabji && !item.price) {
        return;
      }
      const card = document.createElement("div");
      card.className = "menu-item-wrapper";
      let shouldHighlight = false;
      if (item.day === today) {
        shouldHighlight = !(item.status && item.status.toLowerCase() === "not available");
      }
      if (availableDays.includes(item.day)) {
        shouldHighlight = true;
      }
      if (shouldHighlight) {
        card.classList.add("highlight");
      }
      const combinedTitle = `${toSentenceCase(item.daal)} and  ${toSentenceCase(item.sabji)}`;
      let specialLine = "";
      const parts = [];
      if (item.snacks)
        parts.push(toSentenceCase(item.snacks));
      if (item.dessert)
        parts.push(toSentenceCase(item.dessert));
      if (parts.length > 0) {
        specialLine += parts.join(" ");
      } else {
        specialLine = "";
      }
      card.innerHTML = `
  <h4 class="menu-day">${item.day}</h4>
  <div class="menu-item">
    <span class="menu-price" data-base-price="${item.price}">${item.price} \xA3</span>
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
            <button class="qty-btn minus">\u2013</button>
            <input type="number" class="order-qty" min="1" value="1" />
            <button class="qty-btn plus">+</button>
          </div>
        </div>
        <button class="order-button">Order Now</button>
      </div>
    </div>

    <!-- Row 2: special line across full width -->
    ${specialLine ? `<div class="menu-special-row"><p class="menu-special">Today\u2019s special includes - <span>${specialLine}</span></p></div>` : ""}
  <!-- <div class="dish-rating">${item.rating}</div> -->
 
    </div>
`;
      if (!shouldHighlight) {
        const menuItem = card.querySelector(".menu-item");
        menuItem.setAttribute("data-wait-text", `\u23F3 Wait for ${item.day}`);
      }
      menuGrid.appendChild(card);
    });
    setupQuantityControls();
    setupWhatsAppOrdering("919815235090");
  }
  const cachedData = localStorage.getItem("cachedMenu");
  if (cachedData) {
    try {
      renderMenuItems(JSON.parse(cachedData));
    } catch (err) {
      console.error("Failed to parse cached menu data:", err);
    }
  }
  fetch(`${jsonUrl}?_=${Date.now()}`).then((res) => res.json()).then((data) => {
    localStorage.setItem("cachedMenu", JSON.stringify(data));
    renderMenuItems(data);
  }).catch((err) => {
    console.error("Error loading menu:", err);
    if (!cachedData) {
      menuGrid.innerHTML = `
            <div class="menu-item">
          <span class="menu-price" data-base-price="20">20 \xA3</span>
          <span class="dish-tag">Spicy</span>
          <div class="image-wrapper">
            <img src="images/menu/dish-1.png" alt="Grilled Paneer Tikka" />
          </div>

          <div class="menu-content-row">
            <div class="menu-info">
              <h3 class="menu-name">Grilled Paneer Tikka</h3>
              <p class="menu-description">Smoky marinated paneer grilled to perfection.</p>
              <div class="dish-rating">\u2605\u2605\u2605\u2605\u2606 4.2</div>
            </div>

            <div class="menu-actions">
              <div class="quantity-wrapper">
                <label>Select Quantity</label>
                <div class="qty-control">
                  <button class="qty-btn minus">\u2013</button>
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

// assets/js/testimonial.js
function setupTestimonialsCarousel() {
  document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".testimonial-carousel");
    const dots = document.querySelectorAll(".dot");
    const testimonials = document.querySelectorAll(".testimonial");
    if (!carousel || testimonials.length === 0 || dots.length === 0)
      return;
    let current = 0;
    let autoSlideInterval;
    function updateCarousel(index) {
      const offset = -index * 100;
      carousel.style.transform = `translateX(${offset}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
      current = index;
    }
    function startAutoSlide() {
      autoSlideInterval = setInterval(() => {
        const next = (current + 1) % testimonials.length;
        updateCarousel(next);
      }, 6e3);
    }
    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        updateCarousel(i);
        resetAutoSlide();
      });
    });
    updateCarousel(0);
    startAutoSlide();
  });
}

// assets/js/contact.js
function setupContactForm() {
  const scriptURL = "https://script.google.com/macros/s/AKfycbwJUTzbBzHCL-aQJsqXlf24eLEYQ3e3-D8FAy-d2lbHV49eV2rSAC93risNoN7J91okCQ/exec";
  const form = document.getElementById("ContactForm");
  if (!form)
    return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value
    };
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      // ✅ required for Google Apps Script
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    }).then(() => {
      alert("\u2705 Thank you! Your Message has been sent.");
      form.reset();
    }).catch((error) => {
      console.error("\u274C Error!", error);
      alert("Something went wrong.");
    });
  });
}

// assets/js/main.js
var menuJsonUrl = "https://script.google.com/macros/s/AKfycbyBTQYFNNdKq7QZp54LgpFnOc47CZ4VKqsJZ7rBRKIUx1c0DgwQgbjE9S1WPIkY6xJwuA/exec";
function initSite() {
  initHeader();
  setupQuantityControls();
  setupSmoothScroll();
  setupTestimonialsCarousel();
  setupWhatsAppOrdering("919815235090");
  setupMenuRendering(menuJsonUrl);
  setupContactForm();
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSite);
} else {
  initSite();
}
