import { defineStore } from "pinia";
import { ref } from "vue";
import router from "../router";

interface User {
  id: string;
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isAuthenticated = ref(false);

  const checkAuth = () => {
    const token = localStorage.getItem("ticketapp_session");
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split(".")[1]));
        if (userData.exp > Date.now() / 1000) {
          user.value = userData.user;
          isAuthenticated.value = true;
          return true;
        } else {
          localStorage.removeItem("ticketapp_session");
        }
      } catch (error) {
        localStorage.removeItem("ticketapp_session");
      }
    }
    return false;
  };

  const login = async (email: string, password: string) => {
    if (email && password) {
      const mockUser = {
        id: "1",
        name: "Test User",
        email,
      };

      const token = createMockToken(mockUser);
      localStorage.setItem("ticketapp_session", token);
      user.value = mockUser;
      isAuthenticated.value = true;
      router.push("/dashboard");
      return true;
    }
    throw new Error("Invalid credentials");
  };

  const signup = async (email: string, password: string, name: string) => {
    if (email && password && name) {
      const mockUser = {
        id: "1",
        name,
        email,
      };

      const token = createMockToken(mockUser);
      localStorage.setItem("ticketapp_session", token);
      user.value = mockUser;
      isAuthenticated.value = true;
      router.push("/dashboard");
      return true;
    }
    throw new Error("Invalid signup data");
  };

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    user.value = null;
    isAuthenticated.value = false;
    router.push("/");
  };

  return {
    user,
    isAuthenticated,
    checkAuth,
    login,
    signup,
    logout,
  };
});

function createMockToken(user: User): string {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      user,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours from now
    })
  );
  const signature = btoa("mock-signature");

  return `${header}.${payload}.${signature}`;
}
