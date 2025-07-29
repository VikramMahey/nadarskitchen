// export function setupQuantityControls() {
//   document.querySelectorAll('.quantity-wrapper').forEach((wrapper) => {
//     const minusBtn = wrapper.querySelector('.qty-btn.minus');
//     const plusBtn = wrapper.querySelector('.qty-btn.plus');
//     const qtyInput = wrapper.querySelector('.order-qty');

//     // Ensure all elements are present
//     if (!minusBtn || !plusBtn || !qtyInput) return;

//     plusBtn.addEventListener('click', () => {
//       qtyInput.value = parseInt(qtyInput.value) + 1;
//     });

//     minusBtn.addEventListener('click', () => {
//       if (parseInt(qtyInput.value) > 1) {
//         qtyInput.value = parseInt(qtyInput.value) - 1;
//       }
//     });
//   });
// }


export function setupQuantityControls() {
  document.querySelectorAll('.quantity-wrapper').forEach((wrapper) => {
    const minusBtn = wrapper.querySelector('.qty-btn.minus');
    const plusBtn = wrapper.querySelector('.qty-btn.plus');
    const qtyInput = wrapper.querySelector('.order-qty');

    if (!minusBtn || !plusBtn || !qtyInput) return;

    // Locate the closest .menu-item and then the .menu-price inside it
    const menuItem = wrapper.closest('.menu-item');
    const priceEl = menuItem?.querySelector('.menu-price');
    const basePrice = parseFloat(priceEl?.dataset.basePrice);

    if (!priceEl || isNaN(basePrice)) return;

    const updatePrice = () => {
      const qty = parseInt(qtyInput.value) || 1;
      const total = basePrice * qty;

      // If whole number, show without decimal
      const formattedPrice = Number.isInteger(total) ? `${total}` : `${total.toFixed(2)}`;

      priceEl.textContent = `${formattedPrice} £`;
    };


    plusBtn.addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
      updatePrice();
    });

    minusBtn.addEventListener('click', () => {
      if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
        updatePrice();
      }
    });

    // Trigger once initially
    updatePrice();
  });
}
