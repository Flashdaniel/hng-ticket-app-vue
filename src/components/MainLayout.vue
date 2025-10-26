<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="logo">TicketApp</router-link>
      <div class="nav-links">
        <template v-if="auth.isAuthenticated">
          <router-link to="/dashboard">Dashboard</router-link>
          <router-link to="/tickets">Tickets</router-link>
          <button @click="handleLogout" class="logout-btn">Logout</button>
        </template>
        <template v-else>
          <router-link v-if="!isAuthPage" to="/auth/login">Login</router-link>
          <router-link v-if="!isAuthPage" to="/auth/signup"
            >Sign Up</router-link
          >
        </template>
      </div>
    </nav>
  </header>

  <main>
    <slot></slot>
  </main>

  <footer class="footer">
    <div class="footer-content">
      <div>© 2023 TicketApp. All rights reserved.</div>
      <div class="footer-links">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

export default defineComponent({
  name: "MainLayout",
  setup() {
    const router = useRouter();
    const auth = useAuthStore();

    const isAuthPage = computed(() => {
      const route = router.currentRoute.value;
      return route.path === "/auth/login" || route.path === "/auth/signup";
    });

    const handleLogout = () => {
      auth.logout();
    };

    return {
      auth,
      isAuthPage,
      handleLogout,
    };
  },
});
</script>

<style scoped>
.header {
  background: white;
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-md) 0;
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: bold;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.nav-links a {
  color: var(--color-text);
  text-decoration: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-base);
}

.nav-links a:hover {
  background-color: var(--color-border);
}

.logout-btn {
  background: none;
  border: none;
  color: var(--color-error);
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  transition: var(--transition-base);
}

.logout-btn:hover {
  background-color: var(--color-border);
}

main {
  margin-top: 64px;
  min-height: calc(100vh - 64px);
}

.footer {
  background: var(--color-text);
  color: white;
  padding: var(--spacing-xl) 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-links {
  display: flex;
  gap: var(--spacing-md);
}

.footer-links a {
  color: white;
  text-decoration: none;
  opacity: 0.8;
  transition: var(--transition-base);
}

.footer-links a:hover {
  opacity: 1;
}
</style>
