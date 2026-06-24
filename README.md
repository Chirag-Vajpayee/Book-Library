# Book Library - MERN Stack Application

A full-stack book library management application built with MongoDB, Express, React, and Node.js. Users can browse, add, edit, view, and delete books, with search and genre filtering.

## Features

- View all books in a responsive card grid
- Add new books with form validation
- View full details of a single book
- Edit existing books
- Delete books with confirmation
- Search books by title or author
- Filter books by genre
- Loading and error states throughout

## Technologies Used

**Backend**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- CORS
- dotenv

**Frontend**
- React (with Vite)
- React Hooks (useState, useEffect)
- Fetch API
- Plain CSS

## Project Structure

```
BookLibrary/
├── backend/
│   ├── models/
│   │   └── book.js
│   ├── routes/
│   │   └── bookRoutes.js
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── src/
│   ├── components/
│   │   ├── BookList.jsx
│   │   ├── BookForm.jsx
│   │   └── BookDetails.jsx
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd BookLibrary
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder based on `.env.example`:
```
MONGO_URI=your_mongodb_connection_string_here
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`.

### 3. Frontend setup
Open a new terminal at the project root (not inside backend):
```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (or whichever port Vite picks).

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/:id` | Get a single book by ID |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update a book |
| DELETE | `/api/books/:id` | Delete a book |

## Environment Variables

See `backend/.env.example` for the required variables:
- `MONGO_URI` — Your MongoDB connection string
- `PORT` — Port for the backend server (defaults to 5000)

## Challenges Faced

It had been a while since I worked with the MERN stack. My previous role was Java for backend and C#/.NET for frontend, so getting back into JavaScript based full stack development took some re orientation. The biggest hurdle on the frontend was wiring the data flow correctly fetching from the API with `useEffect`, managing loading and error states  and getting the list to refresh after adding a book (solved using a `key` prop to remount the list component). Once the pattern clicked the rest of the CRUD screens followed the same structure.

## Time Spent

Approximately 7-8 hours total, across backend setup, frontend components, debugging, and styling.

## Author

Built as part of a MERN stack assignment.
