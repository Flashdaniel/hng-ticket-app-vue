<template>
  <MainLayout>
    <div class="dashboard-container">
      <h1 class="dashboard-title">Dashboard</h1>

      <div class="stats-grid">
        <div class="stats-card">
          <h3 class="stats-label">Total Tickets</h3>
          <p class="stats-value">{{ stats.total }}</p>
        </div>

        <div class="stats-card">
          <h3 class="stats-label">Open Tickets</h3>
          <p class="stats-value" style="color: var(--status-open)">
            {{ stats.open }}
          </p>
        </div>

        <div class="stats-card">
          <h3 class="stats-label">In Progress</h3>
          <p class="stats-value" style="color: var(--status-in-progress)">
            {{ stats.inProgress }}
          </p>
        </div>

        <div class="stats-card">
          <h3 class="stats-label">Closed Tickets</h3>
          <p class="stats-value" style="color: var(--status-closed)">
            {{ stats.closed }}
          </p>
        </div>
      </div>

      <router-link to="/tickets" class="action-button">
        Manage Tickets
      </router-link>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import MainLayout from "../components/MainLayout.vue";

export default defineComponent({
  name: "Dashboard",
  components: {
    MainLayout,
  },
  setup() {
    const stats = reactive({
      total: 42,
      open: 15,
      inProgress: 18,
      closed: 9,
    });

    return {
      stats,
    };
  },
});
</script>

<style scoped>
.dashboard-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.dashboard-title {
  margin-bottom: var(--spacing-xl);
  color: var(--color-text);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
}

.stats-card {
  background: white;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.stats-label {
  color: var(--color-text-light);
  font-size: var(--font-size-base);
  font-weight: 500;
}

.stats-value {
  font-size: var(--font-size-2xl);
  font-weight: bold;
  color: var(--color-text);
}

.action-button {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--border-radius-md);
  font-weight: 500;
  transition: var(--transition-base);
}

.action-button:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
