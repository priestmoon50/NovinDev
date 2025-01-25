# NovinDev

**Task Project**

This project is a **ReactJS web application** designed to allow admins to manage users effectively. It demonstrates the implementation of a user management system using `https://reqres.in` API as a mock backend.

---

## Features

1. **User Login:**
   - Admin can log in to the system via the `/api/login` endpoint using valid credentials.
   - The login token is securely stored in session storage.

2. **Users List:**
   - Authenticated admins can view a list of users fetched from `/api/users?page=?`.
   - Users are displayed with their avatars, names, and additional details.

3. **User Details:**
   - Admins can click on any user to view detailed information such as name, email, and avatar.

4. **CRUD Operations:**
   - **Create:** Add new users via the "Create User" page.
   - **Edit:** Modify existing user details through the "Edit User" form.
   - **Delete:** Remove users from the list, with changes reflected dynamically in the UI.

5. **Logout:**
   - Admins can securely log out, clearing their session and redirecting to the login page.

---

## Tech Stack

- **ReactJS**: Used for building the user interface.
- **React Router**: Handles navigation across different pages and protected routes.
- **Axios**: For HTTP requests to the mock API.
- **CSS Modules**: Used for scoped and maintainable styles for components.
- **TypeScript**: Ensures type safety and predictable behavior across the application.

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/priestmoon50/NovinDev.git

2 : Navigate to the project directory:   cd NovinDev

3 : Install dependencies: npm install

4 : npm run dev
