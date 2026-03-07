# Portfolio Signup Project

A full-stack user signup flow with HTML/JS frontend, Node/Express backend, and MongoDB.

## 🚀 Setup & Run

### 1. Backend Setup

```bash
cd backend
npm install
```

Edit `.env` and paste your MongoDB connection string:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mydb
PORT=5000
```

Start the server:
```bash
npm start
# or for auto-reload:
npm run dev
```

### 2. Frontend

The React/Vite application in `../portfolio-website-main - Copy (2)` includes a contact form that submits to the backend.
By default the API base URL is `http://localhost:5000`; you can override it by creating a `.env` file in the frontend root with:

```
VITE_API_URL=http://localhost:5000
```

Open the UI with `npm run dev` (inside the portfolio project) or serve the static build after `npm run build`.

Serve the static fallback or the original `frontend/index.html` with a simple server:
```bash
npx serve frontend
```

---

## 🧪 Testing

1. Open the frontend in your browser
2. Fill out the signup form and submit
3. Check your MongoDB collection — a new `User` document should appear

Or test with curl:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@test.com","password":"secret123"}'
```

---

## 📁 Structure

```
portfolio-signup-project/
├── frontend/
│   ├── index.html    ← Signup form UI
│   ├── script.js     ← Fetch API call to backend
│   └── style.css     ← Styling
└── backend/
    ├── models/User.js       ← Mongoose schema
    ├── routes/auth.js       ← POST /api/auth/signup
    ├── server.js            ← Express app entry point
    ├── .env                 ← MongoDB URI (keep secret!)
    └── package.json
```

## 🔐 Security Notes

- Passwords are hashed with **bcryptjs** before saving
- Duplicate emails return a `409` error
- `.env` is never committed to version control — add it to `.gitignore`
