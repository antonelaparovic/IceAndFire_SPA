# Ice & Fire SPA

Single Page Application built with Angular + NgRx, using the public  
**An API of Ice And Fire** and a lightweight Node.js backend for authentication.

The application allows users to browse **Characters, Books and Houses** from the Game of Thrones universe, view detailed pages, and manage personal favourites after logging in.

---

## Features

### Authentication (Node.js backend)
- Login
- Users stored in memory (no database)
- JWT-based authentication
- Each user has their own favourites, persisted on the backend

### Data browsing (Angular)
- Characters list + details
- Books list + details
- Houses list + details
- Mobile-first, responsive layout
- Dark theme UI inspired by Game of Thrones

### Favourites
- Add/remove favourites
- Supported for:
  - Characters
  - Books
  - Houses
- Favourites are:
  - Stored per user
  - Loaded on login
  - Cleared on logout

### State management (NgRx)
- Centralized store with feature slices:
  - Characters
  - Books
  - Houses
  - Favourites
  - Auth

---

## Tech Stack

### Frontend
- Angular
- NgRx (Store, Effects, Selectors)
- RxJS
- SCSS
- Angular Router
- Reactive Forms

### Backend
- Node.js
- Express
- JWT
- In-memory data storage
- CORS enabled for local development

---

## Running the Project

The project consists of two parts that need to run in parallel:

- **Backend** – Node.js server (authentication & favourites persistence)
- **Frontend** – Angular Single Page Application

---

### Backend (Node.js)

```
cd backend
npm install
npm run dev
```

the backend will start on http://localhost:3001

### Frontend (Angular)
```
cd frontend
npm install
ng serve
```

Application will be available at http://localhost:4200

## Application Flow

1. The user opens the application at `http://localhost:4200`
2. The user logs in with the in-memory credentials:
  ```
  email: user1@test.com
  ```
  ```
  password: Password123!
  ```
4. The user is redirected to the Characters page
5. User-specific favourites are loaded from the backend
6. The user can:
   - Browse Characters, Books and Houses
   - View detailed pages for each item
   - Add or remove items from Favourites
7. All pages except the Landing page are protected by an Auth Guard
8. On Logout:
    - The JWT token is removed
    - Favourites state is cleared
    - The user is redirected back to the Landing page

