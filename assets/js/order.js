export function setupWhatsAppOrdering(kitchenNumber) {
  document.querySelectorAll(".order-button").forEach((button) => {
    button.addEventListener("click", function () {
      const menuItem = this.closest(".menu-item");
      if (!menuItem) return;

      const name = menuItem.querySelector(".menu-name")?.textContent.trim() || "Unknown Dish";
      const description = menuItem.querySelector(".menu-description")?.textContent.trim() || "";
      const qtyInput = menuItem.querySelector(".order-qty");
      const quantity = parseInt(qtyInput?.value) || 1;

      const priceEl = menuItem.querySelector(".menu-price");
      const basePrice = parseFloat(priceEl?.dataset.basePrice) || 0;
      const totalPrice = basePrice * quantity;

      const formattedTotal = Number.isInteger(totalPrice)
        ? `${totalPrice}`
        : `${totalPrice.toFixed(2)}`;

      const imgElement = menuItem.querySelector("img");
      const imgSrc = imgElement?.getAttribute("src");
      const img = imgSrc ? `${window.location.origin}/${imgSrc}` : "";

      const message = `Hi! I'd like to place an order.

Dish: ${name}
Description: ${description}
Quantity: ${quantity}
Price per unit: ${basePrice} £
Total: ${formattedTotal} £
${img ? `Image: ${img}` : ""}
Please confirm. Thanks!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${kitchenNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    });
  });
}
