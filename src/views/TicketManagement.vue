<template>
  <MainLayout>
    <div class="page-container">
      <h1 class="page-title">Ticket Management</h1>

      <div class="action-bar">
        <button class="button primary" @click="handleCreateTicket">
          Create New Ticket
        </button>
      </div>

      <div class="ticket-grid">
        <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
          <h3 class="ticket-title">{{ ticket.title }}</h3>
          <p class="ticket-description">{{ ticket.description }}</p>
          <div class="ticket-meta">
            <span class="status-tag" :class="'status-' + ticket.status">
              {{ ticket.status.replace("_", " ") }}
            </span>
            <span class="priority-tag" :class="'priority-' + ticket.priority">
              {{ ticket.priority }}
            </span>
          </div>
          <div class="button-group">
            <button class="button" @click="handleEditTicket(ticket)">
              Edit
            </button>
            <button
              class="button danger"
              @click="handleDeleteTicket(ticket.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <div v-if="isModalOpen" class="modal" @click="closeModal">
          <div class="modal-content" @click.stop>
            <h2>{{ editingTicket ? "Edit Ticket" : "Create New Ticket" }}</h2>
            <form @submit.prevent="handleSubmit" class="form">
              <div class="form-field">
                <label for="title">Title</label>
                <input
                  id="title"
                  v-model="formData.title"
                  :class="{ error: errors.title }"
                  required
                />
                <span v-if="errors.title" class="error-text">
                  {{ errors.title }}
                </span>
              </div>

              <div class="form-field">
                <label for="description">Description</label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="4"
                ></textarea>
              </div>

              <div class="form-field">
                <label for="status">Status</label>
                <select id="status" v-model="formData.status">
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div class="form-field">
                <label for="priority">Priority</label>
                <select id="priority" v-model="formData.priority">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div class="button-group">
                <button type="submit" class="button primary">
                  {{ editingTicket ? "Save Changes" : "Create Ticket" }}
                </button>
                <button type="button" class="button" @click="closeModal">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import MainLayout from "../components/MainLayout.vue";

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

interface FormData {
  title: string;
  description: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high";
}

export default defineComponent({
  name: "TicketManagement",
  components: {
    MainLayout,
  },
  setup() {
    const tickets = ref<Ticket[]>([
      {
        id: "1",
        title: "Setup Development Environment",
        description: "Install and configure necessary tools for the project",
        status: "open",
        priority: "high",
        createdAt: new Date(),
      },
      // Add more mock tickets as needed
    ]);

    const isModalOpen = ref(false);
    const editingTicket = ref<Ticket | null>(null);
    const errors = reactive({
      title: "",
    });

    const formData = reactive<FormData>({
      title: "",
      description: "",
      status: "open",
      priority: "medium",
    });

    const resetForm = () => {
      formData.title = "";
      formData.description = "";
      formData.status = "open";
      formData.priority = "medium";
      errors.title = "";
    };

    const handleCreateTicket = () => {
      editingTicket.value = null;
      resetForm();
      isModalOpen.value = true;
    };

    const handleEditTicket = (ticket: Ticket) => {
      editingTicket.value = ticket;
      formData.title = ticket.title;
      formData.description = ticket.description;
      formData.status = ticket.status;
      formData.priority = ticket.priority;
      isModalOpen.value = true;
    };

    const handleDeleteTicket = (id: string) => {
      if (confirm("Are you sure you want to delete this ticket?")) {
        tickets.value = tickets.value.filter((ticket) => ticket.id !== id);
      }
    };

    const handleSubmit = () => {
      if (!formData.title.trim()) {
        errors.title = "Title is required";
        return;
      }

      if (editingTicket.value) {
        tickets.value = tickets.value.map((ticket) =>
          ticket.id === editingTicket.value?.id
            ? { ...ticket, ...formData }
            : ticket
        );
      } else {
        const newTicket: Ticket = {
          id: Date.now().toString(),
          ...formData,
          createdAt: new Date(),
        };
        tickets.value.push(newTicket);
      }

      isModalOpen.value = false;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      resetForm();
    };

    return {
      tickets,
      isModalOpen,
      editingTicket,
      formData,
      errors,
      handleCreateTicket,
      handleEditTicket,
      handleDeleteTicket,
      handleSubmit,
      closeModal,
    };
  },
});
</script>

<style scoped>
.page-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.page-title {
  margin-bottom: var(--spacing-xl);
  color: var(--color-text);
}

.action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
}

.ticket-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.ticket-card {
  background: white;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.ticket-title {
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.ticket-description {
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
}

.ticket-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.status-tag,
.priority-tag {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-full);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.status-open {
  background-color: var(--status-open);
  color: white;
}

.status-in_progress {
  background-color: var(--status-in-progress);
  color: var(--color-text);
}

.status-closed {
  background-color: var(--status-closed);
  color: white;
}

.priority-high {
  background-color: var(--color-error);
  color: white;
}

.priority-medium {
  background-color: var(--color-warning);
  color: var(--color-text);
}

.priority-low {
  background-color: var(--color-success);
  color: white;
}

.button {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: var(--transition-base);
  font-weight: 500;
}

.button.primary {
  background-color: var(--color-primary);
  color: white;
}

.button.danger {
  background-color: var(--color-error);
  color: white;
}

.button:hover {
  opacity: 0.9;
}

.button-group {
  display: flex;
  gap: var(--spacing-md);
  margin-top: var(--spacing-md);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  width: 90%;
  max-width: 500px;
}

.form {
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
  font-weight: 500;
}

.form-field input,
.form-field select,
.form-field textarea {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
}

.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.error-text {
  color: var(--color-error);
  font-size: var(--font-size-sm);
}

.form-field input.error {
  border-color: var(--color-error);
}

textarea {
  resize: vertical;
  min-height: 100px;
}

@media (max-width: 768px) {
  .ticket-grid {
    grid-template-columns: 1fr;
  }
}
</style>
