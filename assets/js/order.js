// order.js

export function setupWhatsAppOrdering(kitchenNumber) {
  document.querySelectorAll(".order-button").forEach((button) => {
    button.addEventListener("click", function () {
      const name = this.dataset.name;
      const description = this.dataset.description;
      const price = this.dataset.price;
      const img = this.dataset.img;

const message = `Hi! I'd like to place an order.

• Dish: *${name}*
• Description: ${description}
• Price: ${price}
${img ? `• Image: ${window.location.origin}/${img}` : ""}

Please confirm, thanks.`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${kitchenNumber}?text=${encodedMessage}`;

      window.open(whatsappUrl, "_blank");
    });
  });
}
