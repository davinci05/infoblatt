// src/main.js
import { exampleArticles } from "./data/exampleData.js";
import { initArticlesView } from "./ui/articlesView.js";
import { initLoginForm } from "./ui/loginForm.js";
import { initOrderForm } from "./ui/orderForm.js";

document.addEventListener("DOMContentLoaded", () => {
  initArticlesView({ articles: exampleArticles });
  initOrderForm();
  initLoginForm({
    onLoginSuccess(userData) {
      // Falls du später noch was Spezielles tun willst
      console.log("Angemeldet als", userData.name);
    },
  });
});
