<template>
  <MainLayout>
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Streamline Your Support Workflow</h1>
        <p class="hero-subtitle">
          Efficiently manage customer tickets, track issues, and deliver
          exceptional support with our intuitive ticket management system.
        </p>
        <div class="hero-actions">
          <router-link to="/auth/signup" class="cta-button primary">
            Get Started
          </router-link>
          <router-link to="/auth/login" class="cta-button secondary">
            Login
          </router-link>
        </div>
      </div>
      <div class="decorative-circle circle1"></div>
      <div class="decorative-circle circle2"></div>
    </section>

    <section class="features">
      <div class="features-grid">
        <div class="feature-card">
          <h3>Easy Ticket Management</h3>
          <p>
            Create, track, and resolve tickets efficiently with our intuitive
            interface.
          </p>
        </div>
        <div class="feature-card">
          <h3>Real-time Updates</h3>
          <p>Stay informed with instant notifications and status updates.</p>
        </div>
        <div class="feature-card">
          <h3>Detailed Analytics</h3>
          <p>
            Track performance metrics and identify trends with comprehensive
            reports.
          </p>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MainLayout from "../components/MainLayout.vue";

export default defineComponent({
  name: "LandingPage",
  components: {
    MainLayout,
  },
});
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, var(--color-primary) 0%, #2980b9 100%);
  overflow: hidden;
  padding: var(--spacing-xl) var(--spacing-lg);
}

.hero::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 150px;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat bottom;
  background-size: cover;
}

.hero-content {
  max-width: 1440px;
  margin: 0 auto;
  text-align: center;
  color: white;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-lg);
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xl);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
}

.cta-button {
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-md);
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition-base);
}

.cta-button.primary {
  background-color: white;
  color: var(--color-primary);
}

.cta-button.primary:hover {
  background-color: var(--color-background);
  transform: translateY(-2px);
}

.cta-button.secondary {
  border: 2px solid white;
  color: white;
}

.cta-button.secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle1 {
  width: 300px;
  height: 300px;
  top: -50px;
  right: -50px;
}

.circle2 {
  width: 200px;
  height: 200px;
  bottom: 100px;
  left: -50px;
}

.features {
  padding: var(--spacing-xl) var(--spacing-lg);
  background-color: var(--color-background);
}

.features-grid {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  background: white;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
}

.feature-card h3 {
  margin-bottom: var(--spacing-md);
  color: var(--color-text);
}

.feature-card p {
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }

  .hero-subtitle {
    font-size: var(--font-size-lg);
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .cta-button {
    text-align: center;
  }
}
</style>
