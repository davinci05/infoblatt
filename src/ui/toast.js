let toastTimeoutId;

export function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  container.innerHTML = "";

  const toast = document.createElement("div");
  toast.className = [
    "flex items-center gap-2 rounded-md px-4 py-2 text-sm text-white shadow-lg",
    "transition-opacity duration-300",
    type === "success"
      ? "bg-emerald-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-slate-800",
  ].join(" ");

  const icon = document.createElement("span");
  icon.className = "material-symbols-outlined text-base";
  icon.textContent =
    type === "success"
      ? "check_circle"
      : type === "error"
      ? "error"
      : "info";

  const text = document.createElement("span");
  text.textContent = message;

  toast.append(icon, text);
  container.appendChild(toast);

  clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => {
      if (container.contains(toast)) {
        container.removeChild(toast);
      }
    }, 300);
  }, 3000);
}
