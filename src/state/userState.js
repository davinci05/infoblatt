// src/state/userState.js
export const user = {
  isLoggedIn: false,
  data: null,

  login(data) {
    this.isLoggedIn = true;
    this.data = data;
  },

  logout() {
    this.isLoggedIn = false;
    this.data = null;
  },

  isAuthenticated() {
    return this.isLoggedIn && this.data != null;
  },
};
