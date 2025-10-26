# Ticket Management App (Vue + TypeScript)

A modern ticket management system built with Vue 3 and TypeScript, featuring a clean interface and comprehensive ticket management capabilities.

## Features

- 🔐 User Authentication (Login/Signup)
- 📊 Dashboard with ticket statistics
- 🎫 Full CRUD operations for tickets
- 🔍 Ticket filtering and search
- 📱 Responsive design (max-width: 1440px)
- 🏗️ State management with Pinia
- 🎨 Clean, modern UI with consistent styling

## Tech Stack

- **Frontend Framework:** Vue 3
- **Type System:** TypeScript
- **Routing:** Vue Router v4
- **State Management:** Pinia
- **Utilities:** VueUse Core
- **Build Tool:** Vite
- **Package Manager:** npm/yarn

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser

## Project Structure

```
src/
  ├── components/       # Reusable components
  │   └── MainLayout.vue
  ├── router/          # Vue Router configuration
  │   └── index.ts
  ├── stores/          # Pinia stores
  │   └── auth.ts
  ├── views/           # Page components
  │   ├── Dashboard.vue
  │   ├── LandingPage.vue
  │   ├── LoginPage.vue
  │   ├── SignupPage.vue
  │   └── TicketManagement.vue
  ├── styles/          # Global styles
  │   └── index.css
  ├── App.vue          # Root component
  └── main.ts          # Entry point
```

## Available Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features in Detail

### Authentication

- Login and signup functionality
- Protected routes with vue-router guards
- Persistent sessions with Pinia store

### Dashboard

- Total tickets count
- Open tickets count
- In-progress tickets count
- Closed tickets count
- Recent tickets list

### Ticket Management

- Create new tickets
- View ticket details
- Edit existing tickets
- Delete tickets with confirmation
- Filter tickets by status
- Search tickets by title/description

### Form Validation

- Required field validation
- Status validation (open/in_progress/closed)
- Real-time validation feedback
- Error messages display

### UI/UX Features

- Modal dialogs for forms
- Responsive layout
- Loading states
- Error handling
- Transition animations

## State Management

The application uses Pinia for state management, providing:

- Centralized state for tickets and auth
- TypeScript support for type safety
- Modular store design
- DevTools integration

## TypeScript Support

- Full TypeScript support with Vue 3
- Type-safe components and stores
- Interface definitions for data models
- Type checking during build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
