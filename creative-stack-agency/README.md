# Creative Stack Agency

Full-stack project with:
- `frontend` (React + Vite)
- `backend` (Express + MongoDB + JWT auth)

## Environment Setup

### 1) Backend env

Copy and configure:

```bash
cp backend/.env.example backend/.env
```

Required values in `backend/.env`:
- `MONGODB_URI` (Atlas/local Mongo connection string)
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `ALLOWED_ORIGINS` (comma-separated frontend URLs)

### 2) Frontend env (optional)

Copy:

```bash
cp frontend/.env.example frontend/.env
```

For local development you can keep `VITE_API_URL` empty and use Vite proxy.

## Install

```bash
npm run install:all
```

## Run

```bash
npm run dev
```

- Frontend: `http://localhost:5173` (or next free port)
- Backend: `http://localhost:3001`

## Security Notes

- Backend validates and sanitizes API input.
- Role checks are enforced on protected admin routes.
- Inquiry endpoint (`/api/inquiries`) is rate-limited.
