function toggleAccordion(index) {
  const accordionItems = document.querySelectorAll(".accordion-item");
  const currentItem = accordionItems[index];
  const currentBody = currentItem.querySelector(".accordion-body");
  const currentIcon = currentItem.querySelector(".accordion-icon");
  const currentTitle = currentItem.querySelector(".accordion-title");
  const isActive = currentBody.classList.contains("active");

  accordionItems.forEach((item, i) => {
    const body = item.querySelector(".accordion-body");
    const icon = item.querySelector(".accordion-icon");
    const title = item.querySelector(".accordion-title");

    body.classList.remove("active");
    icon.classList.remove("rotated");
    icon.classList.remove("active");
    title.classList.remove("active");
  });

  if (!isActive) {
    currentBody.classList.add("active");
    currentIcon.classList.add("rotated");
    currentIcon.classList.add("active");
    currentTitle.classList.add("active");
  }
}
