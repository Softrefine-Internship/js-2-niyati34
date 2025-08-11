class Pagination {
  constructor() {
    this.currentPage = 6;
    this.totalPages = 10;
    this.init();
  }

  init() {
    this.bindEvents();
    this.updatePagination();
  }

  bindEvents() {
    document.getElementById("prevBtn").addEventListener("click", () => {
      this.goToPreviousPage();
    });

    document.getElementById("nextBtn").addEventListener("click", () => {
      this.goToNextPage();
    });

    document.querySelectorAll(".page-number").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const page = parseInt(e.target.dataset.page);
        this.goToPage(page);
      });
    });
  }

  goToPage(page) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      this.updateContent();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
      this.updateContent();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
      this.updateContent();
    }
  }

  updateContent() {
    const startItem = (this.currentPage - 1) * 2 + 1;
    const endItem = this.currentPage * 2;

    const items = document.querySelectorAll(".item");
    items[0].textContent = `Item ${startItem}`;
    items[1].textContent = `Item ${endItem}`;
  }

  generatePaginationHTML() {
    let html = "";
    const current = this.currentPage;
    const total = this.totalPages;

    if (current <= 3) {
      for (let i = 1; i <= Math.min(3, total); i++) {
        html += `<button class="pagination-btn page-number ${
          i === current ? "active" : ""
        }" data-page="${i}">${i}</button>`;
      }
      if (total > 3) {
        html += `<span class="ellipsis">...</span>`;
        html += `<button class="pagination-btn page-number" data-page="${total}">${total}</button>`;
      }
    } else if (current >= total - 2) {
      html += `<button class="pagination-btn page-number" data-page="1">1</button>`;
      if (total > 4) {
        html += `<span class="ellipsis">...</span>`;
      }
      for (let i = Math.max(total - 2, 1); i <= total; i++) {
        html += `<button class="pagination-btn page-number ${
          i === current ? "active" : ""
        }" data-page="${i}">${i}</button>`;
      }
    } else {
      html += `<button class="pagination-btn page-number" data-page="1">1</button>`;
      html += `<span class="ellipsis">...</span>`;

      for (let i = current - 1; i <= current + 1; i++) {
        html += `<button class="pagination-btn page-number ${
          i === current ? "active" : ""
        }" data-page="${i}">${i}</button>`;
      }

      html += `<span class="ellipsis">...</span>`;
      html += `<button class="pagination-btn page-number" data-page="${total}">${total}</button>`;
    }

    return html;
  }

  updatePagination() {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = this.generatePaginationHTML();

    document.querySelectorAll(".page-number").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const page = parseInt(e.target.dataset.page);
        this.goToPage(page);
      });
    });

    const prevBtn = document.getElementById("prevBtn");
    prevBtn.disabled = this.currentPage <= 1;

    const nextBtn = document.getElementById("nextBtn");
    nextBtn.disabled = this.currentPage >= this.totalPages;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Pagination();
});
