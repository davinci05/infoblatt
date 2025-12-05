// src/state/cart.js
export const cart = {
  items: [],
};

export function getCartItems() {
  return cart.items;
}

export function getTotalItems() {
  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

export function isCartEmpty() {
  return getTotalItems() === 0;
}

function emitCartChanged() {
  const detail = {
    totalItems: getTotalItems(),
    items: [...cart.items],
  };

  window.dispatchEvent(
    new CustomEvent("cart:changed", {
      detail,
    })
  );
}

export function clearCart() {
  cart.items = [];
  emitCartChanged();
}

export function addCartItem(article) {
  const existing = cart.items.find((item) => item.id === article.id);
  if (!existing) {
    cart.items.push({ quantity: 1, ...article });
  } else {
    existing.quantity += 1;
  }
  emitCartChanged();
}

export function decrementCartItem(articleId) {
  const existing = cart.items.find((item) => item.id === articleId);
  if (!existing) return;

  existing.quantity -= 1;
  if (existing.quantity <= 0) {
    removeCartItem(articleId);
  } else {
    emitCartChanged();
  }
}

export function removeCartItem(articleId) {
  cart.items = cart.items.filter((item) => item.id !== articleId);
  emitCartChanged();
}
