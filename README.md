# Twitter Clone (React + TanStack Router + Hono + Postgres)

![Bun](https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TanStack](https://img.shields.io/badge/TanStack%20Start-FF4154?logo=reactrouter&logoColor=white)
![Hono](https://img.shields.io/badge/Hono-FD4F00?logo=hono&logoColor=white)
![Postgres](https://img.shields.io/badge/Postgres-4169E1?logo=postgresql&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

A modern **Twitter-style** social app built with a cutting-edge stack across frontend and backend.
Designed for performance, scalability, and great DX.

### 🚀 Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind, TanStack Router, Redux Toolkit

- Backend: Hono (TypeScript), Zod, JWT Auth

- Database: PostgreSQL (SQL), Drizzle/Prisma (choose one) for schema & migrations


### ✨ Features

- Auth & Profiles: signup/login, editable bio, avatar, cover, username handle

- Posting: create text posts, images,share link, repost, edit/delete window

- Engagement: comments, likes, bookmarks, reposts, like counts

- Social Graph: follow / unfollow, followers & following lists, mutuals

### Feeds

- Home Feed: from accounts you follow + your reposts

- Explore Feed: trending posts & people (ranked with recency + engagement)


### 📂 Project Structure
```
twitter-clone/
├─ apps/
│  ├─ web/                 # React + Vite + TanStack Router (frontend)
│  └─ server/              # Hono API (backend)
├─ packages/
│  ├─ ui/                  # shared UI components (optional)
│  └─ types/               # shared types & Zod schemas
└─ docs/                   # ADRs, ERD, etc.
```
### ⚙️ Scripts
```Frontend (Vite)
cd apps/web
npm install
npm run dev              # start frontend on http://localhost:5173

Backend (Hono)
cd apps/server
npm install
npm run server           # start API on http://localhost:8000

If you prefer Bun:

bun install
bun run dev            # frontend
bun run server         # backend
```
### 🔐 Environment Variables (Front-end)
 ./server/.env
#### Postgres
```DATABASE_URL="postgresql://USER:PASS@localhost:5432/twitter_clone"```

### 🔐 Environment Variables (Front-end)
 ./client/.env
```VITE_API_URL="http://localhost:8000"```


Validation: Zod on request bodies.
Auth: JWT in Authorization: Bearer <token>.

### ▶️ Quick Start

#### 1) Database
createdb twitter_clone
run your migrations (drizzle-kit or prisma
```drizzle-kit push```
#### 2) Backend
cd apps/server && cp .env.example .env
```npm install && npm run server```

##### 3) Frontend
cd ../web && cp .env.example .env
```npm install && npm run dev```

Open:

Frontend: http://localhost:3000

API: http://localhost:8000/api

### 📄 License

MIT — do whatever you want, just include the license.

### 📌 Notes

AWS S3 Image Upload is included you can use other ones

For production, enable HTTPS, CORS allowlist, and DB connection pooling.
