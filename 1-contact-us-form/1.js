function saveFormData(formData) {
  let existingData = JSON.parse(
    localStorage.getItem("contactFormData") || "[]"
  );
  existingData.push(formData);
  localStorage.setItem("contactFormData", JSON.stringify(existingData));
}

function getFormData() {
  return JSON.parse(localStorage.getItem("contactFormData") || "[]");
}

function clearAllData() {
  localStorage.removeItem("contactFormData");
  displayFormData();
}

function displayFormData() {
  const data = getFormData();
  const tableBody = document.getElementById("dataTableBody");
  const tableInfo = document.getElementById("tableInfo");

  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML = `
            <tr>
              <td colspan="7" class="empty-state">
                <div class="icon">📄</div>
                <div>No form submissions yet</div>
              </td>
            </tr>
          `;
    tableInfo.textContent = "No submissions yet";
  } else {
    data.forEach((item, index) => {
      const row = document.createElement("tr");
      const date = new Date(item.timestamp);
      const formattedDate =
        date.toLocaleDateString() + " " + date.toLocaleTimeString();

      row.innerHTML = `
              <td>${index + 1}</td>
              <td>${formattedDate}</td>
              <td>${item.firstName} ${item.lastName}</td>
              <td>${item.company}</td>
              <td>${item.email}</td>
              <td>${item.phone}</td>
              <td style="max-width: 200px; word-wrap: break-word;">${
                item.message
              }</td>
            `;
      tableBody.appendChild(row);
    });
    tableInfo.textContent = `${data.length} submission(s) stored`;
  }
}

function showDataSection() {
  document.querySelector(".contact-form-section").style.display = "none";
  document.querySelector(".form-header").style.display = "none";
  document.getElementById("dataSection").classList.add("show");
  displayFormData();
}

function showFormSection() {
  document.querySelector(".contact-form-section").style.display = "block";
  document.querySelector(".form-header").style.display = "block";
  document.getElementById("dataSection").classList.remove("show");
}

document.addEventListener("DOMContentLoaded", function () {
  const countrySelector = document.getElementById("countrySelector");
  const dropdown = document.getElementById("countryDropdown");
  const selectedCountry = document.getElementById("selectedCountry");
  const phoneInput = document.getElementById("phone");
  const countryWrapper = document.getElementById("countryWrapper");

  countrySelector.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
      countrySelector.classList.remove("active");
    } else {
      dropdown.classList.add("show");
      countrySelector.classList.add("active");
    }
  });

  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const country = this.getAttribute("data-country");
      const code = this.getAttribute("data-code");
      const text = this.textContent.trim();

      const flagEmoji = text.split(" ")[0];
      selectedCountry.textContent = flagEmoji;
      phoneInput.placeholder = code + " Enter phone number";

      dropdown.classList.remove("show");
      countrySelector.classList.remove("active");
    });
  });

  document.addEventListener("click", function (event) {
    if (!countryWrapper.contains(event.target)) {
      dropdown.classList.remove("show");
      countrySelector.classList.remove("active");
    }
  });

  phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    if (value.length >= 6) {
      formattedValue =
        value.substring(0, 3) +
        "-" +
        value.substring(3, 6) +
        "-" +
        value.substring(6, 10);
    } else if (value.length >= 3) {
      formattedValue = value.substring(0, 3) + "-" + value.substring(3);
    } else {
      formattedValue = value;
    }

    e.target.value = formattedValue;
    clearFieldError("phone");
  });

  phoneInput.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
      const value = e.target.value;
      const cursorPosition = e.target.selectionStart;

      if (value[cursorPosition - 1] === "-") {
        e.preventDefault();
        const newValue =
          value.slice(0, cursorPosition - 2) + value.slice(cursorPosition);
        e.target.value = newValue;
        e.target.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
      }
    }
  });

  document.getElementById("submit-btn").addEventListener("click", function (e) {
    [
      "first-name",
      "last-name",
      "company",
      "email-contact",
      "phone",
      "message",
      "privacy-checkbox",
    ].forEach(clearFieldError);

    const firstName = document.getElementById("first-name").value.trim();
    const lastName = document.getElementById("last-name").value.trim();
    const company = document.getElementById("company").value.trim();
    const email = document.getElementById("email-contact").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const privacyChecked = document.getElementById("privacy-checkbox").checked;

    let isValid = true;
    let firstErrorField = null;

    if (!firstName) {
      showFieldError("first-name", "First name is required");
      isValid = false;
      if (!firstErrorField) firstErrorField = "first-name";
    } else if (firstName.length < 2) {
      showFieldError("first-name", "First name must be at least 2 characters");
      isValid = false;
      if (!firstErrorField) firstErrorField = "first-name";
    }

    if (!lastName) {
      showFieldError("last-name", "Last name is required");
      isValid = false;
      if (!firstErrorField) firstErrorField = "last-name";
    } else if (lastName.length < 2) {
      showFieldError("last-name", "Last name must be at least 2 characters");
      isValid = false;
      if (!firstErrorField) firstErrorField = "last-name";
    }

    if (!company) {
      showFieldError("company", "Company is required");
      isValid = false;
      if (!firstErrorField) firstErrorField = "company";
    } else if (company.length < 2) {
      showFieldError("company", "Company name must be at least 2 characters");
      isValid = false;
      if (!firstErrorField) firstErrorField = "company";
    }

    if (!email) {
      showFieldError("email-contact", "Email is required");
      isValid = false;
      if (!firstErrorField) firstErrorField = "email-contact";
    } else if (!email.includes("@")) {
      showFieldError("email-contact", "Email must contain @ symbol");
      isValid = false;
      if (!firstErrorField) firstErrorField = "email-contact";
    } else if (!isValidEmail(email)) {
      showFieldError("email-contact", "Please enter a valid email address");
      isValid = false;
      if (!firstErrorField) firstErrorField = "email-contact";
    }

    if (!phone) {
      showFieldError("phone", "Phone number is required");
      isValid = false;
      if (!firstErrorField) firstErrorField = "phone";
    } else if (!isValidPhone(phone)) {
      showFieldError(
        "phone",
        "Please enter a valid phone number (e.g., 123-456-7890)"
      );
      isValid = false;
      if (!firstErrorField) firstErrorField = "phone";
    }

    if (!message) {
      showFieldError("message", "Message is required");
      isValid = false;
      if (!firstErrorField) firstErrorField = "message";
    } else if (message.length < 10) {
      showFieldError("message", "Message must be at least 10 characters");
      isValid = false;
      if (!firstErrorField) firstErrorField = "message";
    }

    if (!privacyChecked) {
      showFieldError(
        "privacy-checkbox",
        "Please agree to our privacy policy to continue"
      );
      isValid = false;
      if (!firstErrorField) firstErrorField = "privacy-checkbox";
    }

    if (!isValid) {
      if (firstErrorField) {
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          errorElement.focus();
        }
      }
      return false;
    }

    const formData = {
      firstName,
      lastName,
      company: company || "Not provided",
      email,
      phone: selectedCountry.textContent + " " + phone,
      message,
      privacyAgreed: privacyChecked,
      timestamp: new Date().toISOString(),
    };

    saveFormData(formData);

    console.log("Form Data:", formData);

    showSuccessNotification();

    document.querySelector(".contact-form").reset();
    [
      "first-name",
      "last-name",
      "company",
      "email-contact",
      "phone",
      "message",
      "privacy-checkbox",
    ].forEach(clearFieldError);
    selectedCountry.textContent = "🇺🇸";
    phoneInput.placeholder = "+1 Enter phone number";

    setTimeout(() => {
      showDataSection();
    }, 2000);
  });

  function isValidEmail(email) {
    if (!email.includes("@")) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhone(phone) {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  }

  function showStyledAlert(title, message, type) {
    let icon = "";
    switch (type) {
      case "success":
        icon = "✅";
        break;
      case "error":
        icon = "❌";
        break;
      case "warning":
        icon = "⚠️";
        break;
      default:
        icon = "ℹ️";
    }

    alert(`${icon} ${title}\n\n${message}`);
  }

  function showSuccessNotification() {
    const notification = document.getElementById("success-notification");
    notification.classList.add("show");

    setTimeout(() => {
      hideSuccessNotification();
    }, 5000);
  }

  function hideSuccessNotification() {
    const notification = document.getElementById("success-notification");
    notification.classList.remove("show");
  }

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + "-error");

    if (fieldId === "phone") {
      field.closest(".phone-input-container").classList.add("error");
    } else if (fieldId === "privacy-checkbox") {
      document.getElementById("privacy-container").classList.add("error");
    } else {
      field.classList.add("error");
      field.classList.remove("success");
    }

    if (errorElement) {
      errorElement.textContent = message;
      errorElement.classList.add("show");
    }
  }

  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + "-error");

    if (fieldId === "phone") {
      field.closest(".phone-input-container").classList.remove("error");
    } else if (fieldId === "privacy-checkbox") {
      document.getElementById("privacy-container").classList.remove("error");
    } else {
      field.classList.remove("error");
      field.classList.add("success");
    }

    if (errorElement) {
      errorElement.textContent = "";
      errorElement.classList.remove("show");
    }
  }

  document.getElementById("first-name").addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value) {
      showFieldError("first-name", "First name is required");
    } else if (value.length < 2) {
      showFieldError("first-name", "First name must be at least 2 characters");
    } else {
      clearFieldError("first-name");
    }
  });

  document.getElementById("last-name").addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value) {
      showFieldError("last-name", "Last name is required");
    } else if (value.length < 2) {
      showFieldError("last-name", "Last name must be at least 2 characters");
    } else {
      clearFieldError("last-name");
    }
  });

  document.getElementById("company").addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value) {
      showFieldError("company", "Company is required");
    } else if (value.length < 2) {
      showFieldError("company", "Company name must be at least 2 characters");
    } else {
      clearFieldError("company");
    }
  });

  document
    .getElementById("email-contact")
    .addEventListener("blur", function () {
      const email = this.value.trim();
      if (!email) {
        showFieldError("email-contact", "Email is required");
      } else if (!email.includes("@")) {
        showFieldError("email-contact", "Email must contain @ symbol");
      } else if (!isValidEmail(email)) {
        showFieldError("email-contact", "Please enter a valid email address");
      } else {
        clearFieldError("email-contact");
      }
    });

  phoneInput.addEventListener("blur", function () {
    const phone = this.value.trim();
    if (!phone) {
      showFieldError("phone", "Phone number is required");
    } else if (!isValidPhone(phone)) {
      showFieldError(
        "phone",
        "Please enter a valid phone number (e.g., 123-456-7890)"
      );
    } else {
      clearFieldError("phone");
    }
  });

  document.getElementById("message").addEventListener("blur", function () {
    const value = this.value.trim();
    if (!value) {
      showFieldError("message", "Message is required");
    } else if (value.length < 10) {
      showFieldError("message", "Message must be at least 10 characters");
    } else {
      clearFieldError("message");
    }
  });

  document
    .getElementById("privacy-checkbox")
    .addEventListener("change", function () {
      if (this.checked) {
        clearFieldError("privacy-checkbox");
      }
    });

  document.querySelectorAll(".text-input, .phone-input").forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.borderColor = "#6366f1";
      this.style.boxShadow = "0 0 0 3px rgba(99, 102, 241, 0.1)";
    });

    input.addEventListener("blur", function () {
      this.style.borderColor = "#d1d5db";
      this.style.boxShadow = "none";
    });
  });

  document
    .getElementById("backToFormBtn")
    .addEventListener("click", function () {
      showFormSection();
    });

  document
    .getElementById("clearDataBtn")
    .addEventListener("click", function () {
      if (
        confirm(
          "Are you sure you want to clear all stored form data? This action cannot be undone."
        )
      ) {
        clearAllData();
        showStyledAlert(
          "Data Cleared",
          "All stored form submissions have been removed from local storage.",
          "success"
        );
      }
    });

  displayFormData();
});
