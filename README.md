# Tânia Bulhões | Full Stack Test | API

## Node.js application with the following items:

- Express
- TypeORM
- Migrations
- Public and private routes

---

### Endpoints:
#### Tasks:
- Create Task
- Update Task
- Delete Task
- Get All Tasks
- Search Task By Title

#### Session:
- Create Session

#### User:
- Create User

#### Collection:
https://drive.google.com/file/d/1u0OgJf9MJqPvBDpzWtHiAlpBw1bUUoWQ/view?usp=sharing

---

## Run locally

### Run a Postgres Database with Docker
`docker run --name tb_postgres -e POSTGRES_PASSWORD=your-password -p 5432:5432 -d postgres`

### Configure the env file
- create a .env file based on the .env.example file

### Run migrations
`npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts`

### Install dependencies
`yarn`

### Run the application
`yarn dev`

---

## Thank you
