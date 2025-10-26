<template>
  <MainLayout>
    <div class="auth-container">
      <div class="auth-card">
        <h2 class="auth-title">Welcome Back</h2>
        <form @submit.prevent="handleSubmit" class="auth-form">
          <div class="form-field">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              v-model="formData.email"
              :class="{ error: errors.email }"
              @input="clearError('email')"
            />
            <span v-if="errors.email" class="error-text" role="alert">
              {{ errors.email }}
            </span>
          </div>

          <div class="form-field">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              v-model="formData.password"
              :class="{ error: errors.password }"
              @input="clearError('password')"
            />
            <span v-if="errors.password" class="error-text" role="alert">
              {{ errors.password }}
            </span>
          </div>

          <button type="submit" class="submit-button" :disabled="isSubmitting">
            {{ isSubmitting ? "Logging in..." : "Login" }}
          </button>
        </form>

        <router-link to="/auth/signup" class="auth-link">
          Don't have an account? Sign up
        </router-link>
      </div>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import MainLayout from "../components/MainLayout.vue";

export default defineComponent({
  name: "LoginPage",
  components: {
    MainLayout,
  },
  setup() {
    const auth = useAuthStore();
    const isSubmitting = ref(false);

    const formData = reactive({
      email: "",
      password: "",
    });

    const errors = reactive({
      email: "",
      password: "",
      general: "",
    });

    const validateForm = () => {
      let isValid = true;
      errors.general = "";

      if (!formData.email) {
        errors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Email is invalid";
        isValid = false;
      }

      if (!formData.password) {
        errors.password = "Password is required";
        isValid = false;
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
        isValid = false;
      }

      return isValid;
    };

    const clearError = (field: keyof typeof errors) => {
      errors[field] = "";
    };

    const handleSubmit = async () => {
      if (!validateForm()) return;

      isSubmitting.value = true;
      try {
        await auth.login(formData.email, formData.password);
      } catch (error) {
        errors.email = "Invalid email or password";
        errors.password = "Invalid email or password";
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      formData,
      errors,
      isSubmitting,
      handleSubmit,
      clearError,
    };
  },
});
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 64px);
  background-color: var(--color-background);
  padding: var(--spacing-lg);
}

.auth-card {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  width: 100%;
  max-width: 400px;
}

.auth-title {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  color: var(--color-text);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-field label {
  color: var(--color-text);
  font-weight: 500;
}

.form-field input {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
}

.form-field input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
}

.form-field input.error {
  border-color: var(--color-error);
}

.error-text {
  color: var(--color-error);
  font-size: var(--font-size-sm);
}

.submit-button {
  background-color: var(--color-primary);
  color: white;
  padding: var(--spacing-sm);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-base);
  margin-top: var(--spacing-md);
}

.submit-button:hover:not(:disabled) {
  opacity: 0.9;
}

.submit-button:disabled {
  background-color: var(--color-border);
  cursor: not-allowed;
}

.auth-link {
  color: var(--color-primary);
  text-decoration: none;
  text-align: center;
  margin-top: var(--spacing-md);
  display: block;
}

.auth-link:hover {
  text-decoration: underline;
}
</style>
