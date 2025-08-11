let currentSlideIndex = 1;
const totalSlides = 5;

document.querySelectorAll(".carousel-image").forEach((img, index) => {
  img.addEventListener("error", function () {
    this.src = `https://via.placeholder.com/800x450/4a5568/ffffff?text=Image+${
      index + 1
    }`;
  });
});

function showSlide(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".pagination-dot");

  if (n > totalSlides) currentSlideIndex = 1;
  if (n < 1) currentSlideIndex = totalSlides;

  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[currentSlideIndex - 1].classList.add("active");
  dots[currentSlideIndex - 1].classList.add("active");
}

function nextSlide() {
  currentSlideIndex++;
  showSlide(currentSlideIndex);
}

function previousSlide() {
  currentSlideIndex--;
  showSlide(currentSlideIndex);
}

function currentSlide(n) {
  currentSlideIndex = n;
  showSlide(currentSlideIndex);
}

let autoPlay = setInterval(() => {
  nextSlide();
}, 5000);

document
  .querySelector(".carousel-container")
  .addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
  });

document
  .querySelector(".carousel-container")
  .addEventListener("mouseleave", () => {
    autoPlay = setInterval(() => {
      nextSlide();
    }, 5000);
  });

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    previousSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});
