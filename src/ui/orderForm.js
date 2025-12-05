// src/ui/orderForm.js
import {
  isCartEmpty,
  addCartItem,
  decrementCartItem,
  removeCartItem,
  getCartItems,
  getTotalItems,
  clearCart,
} from "../state/cart.js";
import { user } from "../state/userState.js";
import { showToast } from "./toast.js";

export function initOrderForm() {
  const orderModal = document.getElementById("order-modal");
  const openModalButton = document.getElementById(
    "open-order-modal-button"
  );
  const closeModalButton = document.getElementById("close-order-modal-btn");

  const orderForm = document.getElementById("order-form");
  const formSteps = orderForm.querySelectorAll(".step");
  const previousButtons = orderForm.querySelectorAll(".btn-prev");
  const progressbarSteps = orderForm.querySelectorAll(".progressbar li");

  const fullNameInput = orderForm.querySelector("#full-name");
  const streetInput = orderForm.querySelector("#street");
  const postalCodeInput = orderForm.querySelector("#postal-code");
  const cityInput = orderForm.querySelector("#city");

  const fullNameError = orderForm.querySelector("#full-name-error");
  const streetError = orderForm.querySelector("#street-error");
  const postalCodeError = orderForm.querySelector("#postal-code-error");
  const cityError = orderForm.querySelector("#city-error");

  const addressNextButton = document.getElementById(
    "address-next-button"
  );

  const termsCheckbox = document.getElementById("terms-checkbox");
  const termsError = document.getElementById("terms-error");
  const orderError = document.getElementById("order-error");

  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  const orderAddressInfo = document.getElementById(
    "order-address-info"
  );

  if (
    !orderModal ||
    !openModalButton ||
    !closeModalButton ||
    !orderForm ||
    !fullNameInput ||
    !streetInput ||
    !postalCodeInput ||
    !cityInput
  ) {
    return;
  }

  let currentStep = 0;

  function updateFormSteps() {
    formSteps.forEach((step, index) => {
      step.classList.toggle("step-active", index === currentStep);
    });
  }

  function updateProgressbar() {
    progressbarSteps.forEach((step, index) => {
      step.classList.toggle("active", index <= currentStep);
    });
  }

  function clearFieldError(input, errorElement) {
    if (!input || !errorElement) return;
    input.classList.remove("border-red-500");
    errorElement.textContent = "";
  }

  function setFieldError(input, errorElement, message) {
    if (!input || !errorElement) return;
    if (message) {
      input.classList.add("border-red-500");
      errorElement.textContent = message;
    } else {
      clearFieldError(input, errorElement);
    }
  }

  function clearAllErrors() {
    clearFieldError(fullNameInput, fullNameError);
    clearFieldError(streetInput, streetError);
    clearFieldError(postalCodeInput, postalCodeError);
    clearFieldError(cityInput, cityError);
    if (termsError) termsError.textContent = "";
    if (orderError) orderError.textContent = "";
  }

  // Verbesserte Regex für DE-Adresse
  function validateAddressStep() {
    clearAllErrors();

    const fullName = fullNameInput.value.trim();
    const street = streetInput.value.trim();
    const postalCode = postalCodeInput.value.trim();
    const city = cityInput.value.trim();

    const fullNameRegex =
      /^[A-Za-zÄÖÜäöüß]+(?:[A-Za-zÄÖÜäöüß' -]+)*\s+[A-Za-zÄÖÜäöüß' -]+$/;
    const streetRegex =
      /^[A-Za-zÄÖÜäöüß .'-]{2,}\s+\d+[A-Za-z]?(?:\s*[-/]\s*\d+[A-Za-z]?)?$/;
    const cityRegex = /^[A-Za-zÄÖÜäöüß' -]{2,}$/;
    const postalCodeRegex = /^(0[1-9]|[1-9][0-9])\d{3}$/;

    let valid = true;

    if (!fullNameRegex.test(fullName)) {
      setFieldError(
        fullNameInput,
        fullNameError,
        "Bitte geben Sie einen gültigen Vor- und Nachnamen ein."
      );
      valid = false;
    }

    if (!streetRegex.test(street)) {
      setFieldError(
        streetInput,
        streetError,
        "Bitte geben Sie eine gültige Straße mit Hausnummer ein (z. B. Musterstraße 12)."
      );
      valid = false;
    }

    if (!postalCodeRegex.test(postalCode)) {
      setFieldError(
        postalCodeInput,
        postalCodeError,
        "Bitte geben Sie eine gültige deutsche PLZ mit 5 Ziffern ein."
      );
      valid = false;
    }

    if (!cityRegex.test(city)) {
      setFieldError(
        cityInput,
        cityError,
        "Bitte geben Sie einen gültigen Ort ein."
      );
      valid = false;
    }

    if (!valid && orderError) {
      orderError.textContent =
        "Bitte korrigieren Sie die markierten Felder.";
    }

    return valid;
  }

  function updateAddressNextButtonState() {
    const enabled =
      fullNameInput.value.trim() &&
      streetInput.value.trim() &&
      postalCodeInput.value.trim() &&
      cityInput.value.trim();

    if (!addressNextButton) return;
    addressNextButton.disabled = !enabled;
  }

  [fullNameInput, streetInput, postalCodeInput, cityInput].forEach(
    (input) => {
      input.addEventListener("input", () => {
        clearAllErrors();
        updateAddressNextButtonState();
      });
    }
  );
  updateAddressNextButtonState();

  function updateOrderAddressInfo() {
    orderAddressInfo.innerHTML = `
      <p><strong>Name:</strong> ${fullNameInput.value}</p>
      <p><strong>Adresse:</strong> ${streetInput.value}</p>
      <p><strong>PLZ / Ort:</strong> ${postalCodeInput.value} ${cityInput.value}</p>
    `;
  }

  function updateCartDisplay() {
    cartItemsContainer.innerHTML = "";
    let totalItems = 0;

    getCartItems().forEach((item) => {
      const row = document.createElement("div");
      row.className =
        "py-2 flex flex-col gap-1 border-b border-slate-200";

      const nameElement = document.createElement("div");
      nameElement.className = "text-sm font-semibold";
      nameElement.textContent = item.name;

      const descriptionElement = document.createElement("div");
      descriptionElement.className =
        "text-xs text-slate-600";
      descriptionElement.textContent = item.description;

      const actions = document.createElement("div");
      actions.className =
        "mt-1 flex items-center gap-2 text-xs";

      const quantityElement = document.createElement("span");
      quantityElement.textContent = `Menge: ${item.quantity}`;

      const decrementButton = document.createElement("button");
      decrementButton.type = "button";
      decrementButton.className =
        "inline-flex items-center justify-center rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50";
      decrementButton.textContent = "−";
      decrementButton.addEventListener("click", () => {
        decrementCartItem(item.id);
        updateCartDisplay();
        updateOrderButtonState();
      });

      const incrementButton = document.createElement("button");
      incrementButton.type = "button";
      incrementButton.className =
        "inline-flex items-center justify-center rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50";
      incrementButton.textContent = "+";
      incrementButton.addEventListener("click", () => {
        addCartItem(item);
        updateCartDisplay();
        updateOrderButtonState();
      });

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className =
        "inline-flex items-center justify-center rounded-md border border-red-300 px-2 py-1 text-xs text-red-600 hover:bg-red-50";
      deleteButton.textContent = "Löschen";
      deleteButton.addEventListener("click", () => {
        removeCartItem(item.id);
        updateCartDisplay();
        updateOrderButtonState();
      });

      actions.append(
        quantityElement,
        decrementButton,
        incrementButton,
        deleteButton
      );

      row.append(nameElement, descriptionElement, actions);
      cartItemsContainer.appendChild(row);

      totalItems += item.quantity;
    });

    const total = getTotalItems();
    cartTotalElement.textContent =
      total > 0
        ? `Gesamtartikel im Warenkorb: ${total}`
        : "Der Warenkorb ist leer.";
  }

  function fillAddressFromUser() {
    if (!user.isAuthenticated()) return;
    const data = user.data;

    fullNameInput.value = data.name || "";
    streetInput.value = data.street || "";
    postalCodeInput.value = data.postalCode || "";
    cityInput.value = data.city || "";

    updateAddressNextButtonState();
  }

  function updateOrderButtonState() {
    const orderButton = document.getElementById(
      "open-order-modal-button"
    );
    if (!orderButton) return;

    const labelSpan = orderButton.querySelector(
      "[data-order-button-label]"
    );
    const totalItems = getTotalItems();

    orderButton.disabled = totalItems === 0;

    if (labelSpan) {
      labelSpan.textContent =
        totalItems > 0
          ? `Bestellen (${totalItems})`
          : "Bestellen";
    }
  }

  openModalButton.addEventListener("click", () => {
    if (isCartEmpty()) {
      showToast("Ihr Warenkorb ist leer.", "error");
      return;
    }

    currentStep = 0;
    clearAllErrors();
    updateFormSteps();
    updateProgressbar();

    fillAddressFromUser();
    updateCartDisplay();
    updateOrderAddressInfo();

    orderModal.style.display = "flex";
  });

  closeModalButton.addEventListener("click", () => {
    orderModal.style.display = "none";
    currentStep = 0;
    clearAllErrors();
    updateFormSteps();
    updateProgressbar();
  });

  previousButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        updateFormSteps();
        updateProgressbar();
      }
    });
  });

  if (addressNextButton) {
    addressNextButton.addEventListener("click", () => {
      if (!validateAddressStep()) return;

      currentStep = 1;
      updateFormSteps();
      updateProgressbar();
      updateCartDisplay();
      updateOrderAddressInfo();
    });
  }

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAllErrors();

    if (isCartEmpty()) {
      showToast("Ihr Warenkorb ist leer.", "error");
      return;
    }

    if (!validateAddressStep()) {
      return;
    }

    if (!termsCheckbox.checked) {
      termsError.textContent =
        "Bitte akzeptieren Sie die AGB.";
      return;
    }

    // Hier wäre der API-Call
    clearCart();
    updateCartDisplay();
    updateOrderButtonState();
    showToast("Bestellung erfolgreich gesendet.", "success");

    orderModal.style.display = "none";
  });

  // Auf globale Cart-Events reagieren (wenn z. B. aus Artikelliste geändert)
  window.addEventListener("cart:changed", () => {
    updateOrderButtonState();
  });

  // Initialzustand
  updateFormSteps();
  updateProgressbar();
  updateOrderButtonState();
}
