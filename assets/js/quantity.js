export function setupQuantityControls() {
  document.querySelectorAll('.quantity-wrapper').forEach((wrapper) => {
    const minusBtn = wrapper.querySelector('.qty-btn.minus');
    const plusBtn = wrapper.querySelector('.qty-btn.plus');
    const qtyInput = wrapper.querySelector('.order-qty');

    // Ensure all elements are present
    if (!minusBtn || !plusBtn || !qtyInput) return;

    plusBtn.addEventListener('click', () => {
      qtyInput.value = parseInt(qtyInput.value) + 1;
    });

    minusBtn.addEventListener('click', () => {
      if (parseInt(qtyInput.value) > 1) {
        qtyInput.value = parseInt(qtyInput.value) - 1;
      }
    });
  });
}
