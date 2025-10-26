import { createApp } from "vue";
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from "vue-router";
import { createPinia } from "pinia";
import App from "./App.vue";
import routes from "./router";
import "./styles/index.css";

const pinia = createPinia();
const app = createApp(App);

// Create and configure router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Global navigation guard
router.beforeEach(
  async (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: Function
  ) => {
    // Check if the route requires authentication
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const token = localStorage.getItem("ticketapp_session");

    if (requiresAuth && !token) {
      // Redirect to login page if trying to access protected route without auth
      next({ path: "/auth/login" });
    } else if (
      token &&
      (to.path === "/auth/login" || to.path === "/auth/signup")
    ) {
      // Redirect to dashboard if trying to access auth pages while logged in
      next({ path: "/dashboard" });
    } else {
      next();
    }
  }
);

// Mount app with store and router
app.use(pinia);
app.use(router);
app.mount("#app");
