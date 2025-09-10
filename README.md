# Twitter Clone (React + TanStack Router + Hono + Postgres)

Twitter Clone (React + TanStack Router + Hono + Postgres)


A modern Twitter-style social app built with a cutting-edge stack across frontend and backend.
Designed for performance, scalability, and great DX.

🚀 Tech Stack

Frontend: React, TypeScript, Vite, Tailwind, TanStack Router, Redux Toolkit

Backend: Hono (TypeScript), Zod, JWT Auth

Database: PostgreSQL (SQL), Drizzle/Prisma (choose one) for schema & migrations

Caching: HTTP cache + ETag, server-side LRU (in-memory) with optional Redis

Storage/Infra (optional): Supabase for auth/storage, Vercel/Cloudflare/Bun runtime

✨ Features

Auth & Profiles: signup/login, editable bio, avatar, cover, username handle

Posting: create text posts, images, link previews, repost, quote, edit/delete window

Engagement: comments, likes, bookmarks, reposts, view counts

Social Graph: follow / unfollow, followers & following lists, mutuals

Feeds:

Home Feed: from accounts you follow + your reposts

Explore Feed: trending posts & people (ranked with recency + engagement)

Search: users, posts, hashtags

Caching: server-rendered feed pages with HTTP Cache-Control, conditional requests via ETag, server LRU caching for hot lists; cache busting on writes

Accessibility & Perf: image lazy-load, skeletons, optimistic UI, prefetch on route hover

🗂 Project Structure
twitter-clone/
├─ apps/
│  ├─ web/                 # React + Vite + TanStack Router (frontend)
│  └─ server/              # Hono API (backend)
├─ packages/
│  ├─ ui/                  # shared UI components (optional)
│  └─ types/               # shared types & Zod schemas
└─ docs/                   # ADRs, ERD, etc.

⚙️ Scripts
Frontend (Vite)
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

🔐 Environment Variables
apps/server/.env
# Postgres
DATABASE_URL="postgresql://USER:PASS@localhost:5432/twitter_clone"

apps/web/.env
VITE_API_URL="http://localhost:8000"



Validation: Zod on request bodies.
Auth: JWT in Authorization: Bearer <token>.

▶️ Quick Start

# 1) Database
createdb twitter_clone
# run your migrations (drizzle-kit or prisma)

# 2) Backend
cd apps/server && cp .env.example .env
npm install && npm run server

# 3) Frontend
cd ../web && cp .env.example .env
npm install && npm run dev

Open:

Frontend: http://localhost:3000

API: http://localhost:8000/api

📄 License

MIT — do whatever you want, just include the license.

📌 Notes

AWS S3 Image Upload is included you can use other ones

For production, enable HTTPS, CORS allowlist, and DB connection pooling.

This README includes the badge & “Tech Stack” section like the reference image at the top.
