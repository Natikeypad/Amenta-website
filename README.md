# Amenta Agricultural Development PLC

Public website for Amenta Agricultural Development PLC — company profile, gallery, news, and portfolio.

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Hono, tRPC
- **Database:** MySQL (Drizzle ORM)

## Local development

```bash
cd app
npm install
cp .env.example .env   # fill in your values
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy live (get a public link)

This app needs a **Node.js server** and a **MySQL database**. GitHub stores the code; use a host like [Render](https://render.com) for the live site.

### 1. Push code to GitHub

1. Create a new **public** repository at [github.com/new](https://github.com/new) (e.g. `amenta-website`).
2. In this folder, run:

```powershell
git init
git add .
git commit -m "Initial commit: Amenta website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/amenta-website.git
git push -u origin main
```

### 2. Deploy on Render (recommended)

1. Sign up at [render.com](https://render.com) and connect your GitHub account.
2. Create a **MySQL** database (e.g. [Railway](https://railway.app) or [Aiven free tier](https://aiven.io/free-mysql-database)) and copy the connection URL.
3. **New → Blueprint** (or Web Service) → import your GitHub repo. Render will read `render.yaml` from the repo root.
4. Add environment variables (from `app/.env.example`):

| Variable | Notes |
|----------|--------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | MySQL URL from step 2 |
| `APP_ID` | Your Kimi app ID |
| `APP_SECRET` | Your Kimi app secret |
| `KIMI_AUTH_URL` | Kimi OAuth URL |
| `KIMI_OPEN_URL` | Kimi Open Platform URL |
| `OWNER_UNION_ID` | Admin user union ID |
| `VITE_APP_ID` | Same as `APP_ID` |
| `VITE_KIMI_AUTH_URL` | Same as `KIMI_AUTH_URL` |

5. After the first deploy, open the Render **Shell** for the web service and run:

```bash
npm run db:push
npm run db:seed
npm run db:seed-gallery
```

Your public link will look like: `https://amenta-website.onrender.com`

## Project structure

```
app/
  api/          # Hono + tRPC backend
  db/           # Schema, seeds, migrations
  public/       # Static images and assets
  src/          # React frontend
```
