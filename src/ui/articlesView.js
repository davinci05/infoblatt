import {
  addCartItem,
  decrementCartItem,
  getCartItems,
  getTotalItems,
} from "../state/cart.js";

let renderMode = "order"; // "order" | "downloads"
let articlesData = [];
let currentList = [];
let container;
let searchInput;
let orderStateButton;
let downloadStateButton;
let orderModalButton;

export function initArticlesView({ articles }) {
  articlesData = articles;
  currentList = articles;

  container = document.getElementById("articlesContainer");
  searchInput = document.getElementById("articleSearch");
  orderStateButton = document.getElementById("orderStateButton");
  downloadStateButton = document.getElementById("downloadStateButton");
  orderModalButton = document.getElementById("open-order-modal-button");

  if (
    !container ||
    !searchInput ||
    !orderStateButton ||
    !downloadStateButton ||
    !orderModalButton
  ) {
    return;
  }

  function setMode(newMode) {
    renderMode = newMode;

    orderStateButton.dataset.active = newMode === "order" ? "true" : "false";
    downloadStateButton.dataset.active =
      newMode === "downloads" ? "true" : "false";

    if (renderMode === "order") {
      orderModalButton.classList.remove("hidden");
    } else {
      orderModalButton.classList.add("hidden");
    }

    renderArticles(currentList);
  }

  orderStateButton.addEventListener("click", () => {
    setMode("order");
  });

  downloadStateButton.addEventListener("click", () => {
    setMode("downloads");
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    const filtered = articlesData.filter((article) => {
      const inName = article.name?.toLowerCase().includes(query);

      const inDescription = article.description?.toLowerCase().includes(query);

      const inCategory = article.category
        ? article.category.toLowerCase().includes(query)
        : false;

      const inTags = Array.isArray(article.tags)
        ? article.tags.some((tag) => String(tag).toLowerCase().includes(query))
        : false;

      return inName || inDescription || inCategory || inTags;
    });

    currentList = filtered;
    renderArticles(currentList);
  });

  window.addEventListener("cart:changed", () => {
    renderArticles(currentList);
  });

  // Initial render
  setMode("order");
}

function updateOrderButtonUi() {
  if (!orderModalButton) return;
  const labelSpan = orderModalButton.querySelector("[data-order-button-label]");
  const totalItems = getTotalItems();

  orderModalButton.disabled = totalItems === 0;

  if (labelSpan) {
    labelSpan.textContent =
      totalItems > 0 ? `Bestellen (${totalItems})` : "Bestellen";
  }
}

export function renderArticles(list) {
  if (!container) return;
  currentList = list;

  container.innerHTML = "";

  const cartItems = getCartItems();

  list.forEach((article) => {
    const articleElement = document.createElement("article");
    articleElement.className =
      "rounded-lg border border-slate-200 bg-white p-4 flex flex-col gap-2 shadow-sm";

    const title = document.createElement("h3");
    title.className = "text-sm font-semibold text-slate-900";
    title.textContent = article.name;

    const description = document.createElement("p");
    description.className = "text-xs text-slate-600";
    description.textContent = article.description;

    articleElement.append(title, description);

    if (article.category || article.filesize) {
      const metaRow = document.createElement("div");
      metaRow.className = "mt-1 flex flex-wrap items-center gap-2 text-[11px]";

      if (article.category) {
        const categoryBadge = document.createElement("span");
        categoryBadge.className =
          "inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700";
        categoryBadge.textContent = article.category;
        metaRow.appendChild(categoryBadge);
      }

      if (article.filesize) {
        const sizeText = document.createElement("span");
        sizeText.className = "text-[11px] text-slate-500";
        sizeText.textContent = article.filesize;
        metaRow.appendChild(sizeText);
      }

      articleElement.appendChild(metaRow);
    }

    if (Array.isArray(article.tags) && article.tags.length > 0) {
      const tagsRow = document.createElement("div");
      tagsRow.className = "mt-1 flex flex-wrap gap-1";

      article.tags.forEach((tag) => {
        const tagBadge = document.createElement("span");
        tagBadge.className =
          "inline-flex items-center rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-600";
        tagBadge.textContent = String(tag);
        tagsRow.appendChild(tagBadge);
      });

      articleElement.appendChild(tagsRow);
    }

    const cartItem = cartItems.find((item) => item.id === article.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    if (renderMode === "downloads") {
      const actions = document.createElement("div");
      actions.className = "mt-3 flex justify-end";

      const downloadLink = document.createElement("a");
      const base = window.location.pathname.split("/")[1];

      downloadLink.href = `/${base}/${article.downloadlink}`;
      //   downloadLink.download = article.downloadfilename;
      downloadLink.target = "_blank";
      downloadLink.className =
        "inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50";
      downloadLink.innerHTML = `
        <span class="material-symbols-outlined text-base">download</span>
        <span>Herunterladen</span>
      `;

      actions.appendChild(downloadLink);
      articleElement.appendChild(actions);
    } else {
      const quantityInfo = document.createElement("p");
      quantityInfo.className = "text-xs text-slate-500";
      quantityInfo.textContent = `Im Warenkorb: ${quantity}`;

      const actions = document.createElement("div");
      actions.className = "mt-2 flex items-center justify-between gap-2";

      const buttons = document.createElement("div");
      buttons.className = "flex items-center gap-2";

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className =
        "inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed";
      removeButton.innerHTML = `
        <span class="material-symbols-outlined text-base">remove</span>
        <span class="sr-only">Aus dem Warenkorb entfernen</span>
      `;
      removeButton.disabled = quantity === 0;
      removeButton.addEventListener("click", () => {
        decrementCartItem(article.id);
      });

      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.className =
        "inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700 hover:bg-slate-50";
      addButton.innerHTML = `
        <span class="material-symbols-outlined text-base">add</span>
        <span class="sr-only">In den Warenkorb</span>
      `;
      addButton.addEventListener("click", () => {
        addCartItem(article);
      });

      buttons.append(removeButton, addButton);
      actions.append(quantityInfo, buttons);

      articleElement.appendChild(actions);
    }

    container.appendChild(articleElement);
  });

  updateOrderButtonUi();
}
