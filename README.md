# Ice & Fire SPA

Single Page Application built with **Angular + NgRx**, using the public  
**An API of Ice And Fire** and a lightweight **Node.js backend** for authentication.

The application allows users to browse **Characters, Books and Houses** from the Game of Thrones universe, view detailed pages, and manage **personal favourites** after logging in.

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
- **Angular**
- **NgRx (Store, Effects, Selectors)**
- **RxJS**
- **SCSS**
- Angular Router
- Reactive Forms

### Backend
- **Node.js**
- **Express**
- **JWT**
- In-memory data storage
- CORS enabled for local development

---

## Running the Project

The project consists of two parts that need to run in parallel:

- **Backend** – Node.js server (authentication & favourites persistence)
- **Frontend** – Angular Single Page Application

---

### Backend (Node.js)

```bash
cd backend
npm install
npm run dev

the backend will start on http://localhost:3001

### Frontend (Angular.js)
```bash
cd frontend
npm install
ng serve

Application will be available at http://localhost:4200
