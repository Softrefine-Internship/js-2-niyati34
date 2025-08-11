function openModal() {
  const modal = document.getElementById("modalOverlay");
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal(event) {
  if (!event || event.target === document.getElementById("modalOverlay")) {
    const modal = document.getElementById("modalOverlay");
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }
}

function deactivateAccount() {
  alert("Account deactivation confirmed!");
  closeModal();
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

document.querySelector(".modal").addEventListener("click", function (event) {
  event.stopPropagation();
});
