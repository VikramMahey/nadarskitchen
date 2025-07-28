// // order.js

// export function setupWhatsAppOrdering(kitchenNumber) {
//   document.querySelectorAll(".order-button").forEach((button) => {
//     button.addEventListener("click", function () {
//       const name = this.dataset.name;
//       const description = this.dataset.description;
//       const price = this.dataset.price;
//       const img = this.dataset.img;

// const message = `Hi! I'd like to place an order.

// • Dish: *${name}*
// • Description: ${description}
// • Price: ${price}
// ${img ? `• Image: ${window.location.origin}/${img}` : ""}

// Please confirm, thanks.`;

//       const encodedMessage = encodeURIComponent(message);
//       const whatsappUrl = `https://wa.me/${kitchenNumber}?text=${encodedMessage}`;

//       window.open(whatsappUrl, "_blank");
//     });
//   });
// }


// order.js
export function setupWhatsAppOrdering(kitchenNumber) {
  document.querySelectorAll(".order-button").forEach((button) => {
    button.addEventListener("click", function () {
      const menuItem = this.closest(".menu-item");

      if (!menuItem) return;

      const name = menuItem.querySelector(".menu-name")?.textContent.trim() || "Unknown Dish";
      const description = menuItem.querySelector(".menu-description")?.textContent.trim() || "";
      const price = menuItem.querySelector(".menu-price")?.textContent.trim() || "N/A";
      const imgElement = menuItem.querySelector("img");
      const imgSrc = imgElement?.getAttribute("src");
      const img = imgSrc ? `${window.location.origin}/${imgSrc}` : "";

      const message = `Hi! I'd like to place an order.

Dish: ${name}
Description: ${description}
Price: ${price}
${img ? `Image: ${img}` : ""}
Please confirm. Thanks!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${kitchenNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    });
  });
}
