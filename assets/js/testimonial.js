export function setupTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonial-carousel');
  const dots = document.querySelectorAll('.dot');
  const testimonials = document.querySelectorAll('.testimonial');
  let current = 0;
  let autoSlideInterval;

  function updateCarousel(index) {
    const offset = -index * 100;
    carousel.style.transform = `translateX(${offset}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    current = index;
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      const next = (current + 1) % testimonials.length;
      updateCarousel(next);
    }, 6000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      updateCarousel(i);
      resetAutoSlide();
    });
  });

  // Initialize
  updateCarousel(0);
  startAutoSlide();
}
