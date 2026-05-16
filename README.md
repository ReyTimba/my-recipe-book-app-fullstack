# My Recipe Book App

Full stack recipe book app built with React, TypeScript, Express, PostgreSQL, Docker and Prisma.

## Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL with Docker
- ORM: Prisma 7

## Project Structure

```txt
my_recipe_book_app_fullStack
├─ backend
│  ├─ prisma
│  └─ src
└─ frontend
   └─ src
```

## Environment Variables

Create a `.env` file inside `backend`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/app_db"
```

The `.env` file is ignored by Git.

## Run Locally

### Backend

```bash
cd backend
npm install
docker compose up -d
npx prisma db push
npx prisma generate
npm run dev
```

Backend runs at:

```txt
http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite will show the local frontend URL in the terminal.

## Current Features

- List recipes
- Create recipes
- Select a recipe
- Basic recipe detail view
- Prepared UI views for filters and recipe form

## Notes

This project is in an early learning/prototyping stage. The current focus is understanding the full stack data flow:

```txt
React -> Express -> Prisma -> PostgreSQL
```
