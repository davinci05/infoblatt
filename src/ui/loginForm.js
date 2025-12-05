// src/ui/loginForm.js
import { user } from "../state/userState.js";
import { exampleUsers } from "../data/exampleData.js";
import { showToast } from "./toast.js";

function updateHeaderForLoggedInState() {
  const greetingElement = document.getElementById("user-greeting");
  const loginButton = document.getElementById("open-login-modal-button");

  if (!greetingElement || !loginButton) return;

  if (user.isAuthenticated()) {
    greetingElement.textContent = `Hallo, ${user.data.name}`;
    greetingElement.classList.remove("hidden");
    loginButton.classList.add("hidden");
  } else {
    greetingElement.textContent = "";
    greetingElement.classList.add("hidden");
    loginButton.classList.remove("hidden");
  }
}

export function initLoginForm({ onLoginSuccess } = {}) {
  const loginModal = document.getElementById("login-modal");
  const openLoginModalButton = document.getElementById(
    "open-login-modal-button"
  );
  const closeLoginModalButton = document.getElementById(
    "close-login-modal-btn"
  );

  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const loginButton = document.getElementById("login-button");
  const loginError = document.getElementById("login-error");

  if (
    !loginModal ||
    !openLoginModalButton ||
    !closeLoginModalButton ||
    !loginForm ||
    !emailInput ||
    !passwordInput ||
    !loginButton
  ) {
    return;
  }

  function updateLoginButtonState() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const enabled = email !== "" && password !== "";

    loginButton.disabled = !enabled;
  }

  openLoginModalButton.addEventListener("click", () => {
    loginError.textContent = "";
    loginForm.reset();
    updateLoginButtonState();
    loginModal.style.display = "flex";
  });

  closeLoginModalButton.addEventListener("click", () => {
    loginModal.style.display = "none";
  });

  emailInput.addEventListener("input", updateLoginButtonState);
  passwordInput.addEventListener("input", updateLoginButtonState);
  updateLoginButtonState();

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loginError.textContent = "";

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const matchedUser = exampleUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (matchedUser) {
      user.login(matchedUser);
      updateHeaderForLoggedInState();
      loginModal.style.display = "none";

      showToast(`Hallo, ${user.data.name}`, "success");

      if (typeof onLoginSuccess === "function") {
        onLoginSuccess(user.data);
      }
    } else {
      loginError.textContent = "Falsche E-Mail oder Passwort.";
      showToast(
        "Login nicht möglich. Bitte prüfen Sie Ihre Eingaben.",
        "error"
      );
    }
  });

  // Initialer UI-Zustand (falls später mal ein Auto-Login kommt)
  updateHeaderForLoggedInState();
}
