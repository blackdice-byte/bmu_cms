# BMU CMS — Bayelsa Medical University

A full-stack content management system built as a pitch/demo for **Bayelsa Medical University (BMU)** — a public-facing university & teaching hospital website backed by an admin dashboard with role-based access control.

## Tech stack

| Layer    | Tech |
|----------|------|
| Backend  | Node.js, Express, MongoDB (Mongoose), JWT auth, Axios (outbound webhook) |
| Frontend | React (Vite), Tailwind CSS v4, shadcn/ui, Redux Toolkit Query (with an Axios base query) |

## Features

- **Public website**: Home, About, Departments, Doctors/Staff, Academic Programs, Hospital Services, News & Announcements, Gallery, Events, Contact & Appointment booking.
- **Admin dashboard**: overview stats, and full CRUD for Pages, News, Departments, Staff, Programs, Services, Gallery, Events and Inquiries.
- **Role-based access control (RBAC)** with three roles:
  - **Admin** — full access, including user management.
  - **Editor** — can create/edit/delete content, cannot manage users.
  - **Viewer** — read-only access to the admin dashboard.
- **JWT authentication** with role claims enforced on every protected API route (not just hidden in the UI).
- **Zero-config database**: if you don't provide a `MONGO_URI`, the API automatically spins up a temporary in-memory MongoDB and seeds it with realistic BMU demo data on every boot — perfect for a pitch demo. Point it at a real MongoDB/Atlas URI for persistent data.

## Project structure

```
bmu_demo_cms_system/
├── server/            Express API (MongoDB, JWT, RBAC)
│   └── src/
│       ├── models/        Mongoose schemas
│       ├── controllers/   Route handlers (shared CRUD factory + custom auth/inquiry/stats logic)
│       ├── routes/        Express routers
│       ├── middleware/    JWT auth + RBAC + error handling
│       └── utils/         seed data, JWT helpers, webhook notifier
└── client/            React app (Vite, Tailwind, shadcn/ui, RTK Query)
    └── src/
        ├── features/api/      RTK Query API slice (axios-based)
        ├── features/auth/     auth slice (JWT + user in localStorage)
        ├── components/ui/     shadcn/ui components
        ├── components/admin/  generic CrudPage + ResourceForm shared by every resource
        ├── components/layout/ public & admin layouts, route guards
        └── pages/
            ├── public/    the public website
            └── admin/     the admin dashboard
```

## Getting started

Requires Node.js 18+.

```bash
npm run install:all   # installs server + client dependencies
npm run dev           # runs both the API (port 5001) and the client (port 5174)
```

Then open **http://localhost:5174**.

The API boots with **no MongoDB setup required** — it starts an in-memory MongoDB and seeds demo data automatically. You'll see the demo login credentials printed in the server logs on boot:

```
Admin  -> admin@bmu.edu.ng / password123
Editor -> editor@bmu.edu.ng / password123
Viewer -> viewer@bmu.edu.ng / password123
```

Sign in at **http://localhost:5174/admin/login**.

> Note: with the in-memory database, data resets whenever the server restarts (and reseeds automatically). To persist data across restarts, set a real `MONGO_URI` in `server/.env` (local MongoDB or a free MongoDB Atlas cluster) — the server will use it instead and only auto-seeds if it's empty.

### Running the pieces separately

```bash
npm run dev:server   # http://localhost:5001
npm run dev:client   # http://localhost:5174
```

### Re-seeding demo data manually

Only needed when using a real `MONGO_URI` (the in-memory DB always reseeds on boot):

```bash
npm run seed
```

## Configuration

Copy the example env files and adjust as needed:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

- `server/.env` — `MONGO_URI`, `JWT_SECRET`, `PORT`, `CLIENT_ORIGIN` (CORS), optional `INQUIRY_WEBHOOK_URL` (Slack/Discord-style webhook fired when a new contact/appointment inquiry is submitted).
- `client/.env` — `VITE_API_URL` (defaults to `http://localhost:5001/api`).

## Security notes (demo scope)

This is a pitch/demo build. Before any production use, you'd also want: rate limiting on auth/contact endpoints, refresh-token rotation, file-upload support with virus scanning for real photo uploads (images currently use URLs), and an audit log for admin actions.
