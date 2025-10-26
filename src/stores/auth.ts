import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

interface User {
  id: string;
  name: string;
  email: string;
}

interface TokenPayload {
  user: User;
  exp: number;
}

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  // State
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  // Getters
  const currentUser = computed(() => user.value);

  // Actions
  function createToken(user: User): string {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
      JSON.stringify({
        user,
        exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiration
      })
    );
    const signature = btoa("mock-signature");
    return `${header}.${payload}.${signature}`;
  }

  function parseToken(token: string): TokenPayload | null {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }

  function checkAuth(): boolean {
    const token = localStorage.getItem("ticketapp_session");
    if (!token) {
      isAuthenticated.value = false;
      user.value = null;
      return false;
    }

    const payload = parseToken(token);
    if (payload && payload.exp > Date.now() / 1000) {
      user.value = payload.user;
      isAuthenticated.value = true;
      return true;
    }

    localStorage.removeItem("ticketapp_session");
    isAuthenticated.value = false;
    user.value = null;
    return false;
  }

  async function login(email: string, password: string): Promise<void> {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    try {
      // Simulate API call
      const mockUser: User = {
        id: "1",
        name: "Test User",
        email,
      };

      const token = createToken(mockUser);
      localStorage.setItem("ticketapp_session", token);
      user.value = mockUser;
      isAuthenticated.value = true;

      await router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Invalid email or password");
    }
  }

  async function signup(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    if (!name || !email || !password) {
      throw new Error("Name, email and password are required");
    }

    try {
      // Simulate API call
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
      };

      const token = createToken(mockUser);
      localStorage.setItem("ticketapp_session", token);
      user.value = mockUser;
      isAuthenticated.value = true;

      await router.push("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error);
      throw new Error("Registration failed");
    }
  }

  async function logout(): Promise<void> {
    localStorage.removeItem("ticketapp_session");
    user.value = null;
    isAuthenticated.value = false;

    await router.push("/auth/login");
  }

  // Initialize auth state
  checkAuth();

  return {
    // State
    user,
    isAuthenticated,
    // Getters
    currentUser,
    // Actions
    login,
    signup,
    logout,
    checkAuth,
  };
});
