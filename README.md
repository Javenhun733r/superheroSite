# Superhero Web App

A web application to manage superheroes, allowing users to create, update, delete, and view superheroes with multiple images.

---

## Features

- CRUD operations for superheroes
- Assign and remove multiple images
- List superheroes with pagination (5 per page)
- View detailed information, including all images
- Image storage using AWS S3
- Basic unit tests for backend service logic

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** Vue.js 3
- **Database:** PostgreSQL (via Prisma ORM)
- **File Storage:** AWS S3
- **Testing:** Jest

---

## Getting Started

1. **Clone the repository:** 

git clone https://github.com/Javenhun733r/superheroSite.git

cd superheroSite

2. **Install dependencies:**

npm install


3. **Configure environment variables:**

Create a .env file based on .env.example:

On Backend:

DATABASE_URL="your_database_url" 

AWS_REGION="your_region"

S3_BUCKET_NAME="your_bucket_name"

On Frontend:

VITE_BACKEND_URL="http://localhost:5231"

4. **Generate Prisma client and seed database (optional):**

npx prisma generate

node prisma/seed.js

5.**Run the app:**

# Backend

npm run dev

# Frontend (in separate terminal)

cd frontend

npm run dev


Backend runs on the port defined in .env (default: 5231)

Frontend runs on the default Vite port (5173)

---

## Running Tests

Unit tests cover the main backend service logic:

npm run test


---

## Notes / Assumptions


-Superpowers are stored as an array of strings.

-The project is configured to run locally for testing and development.

-Image URLs are stored in S3 and deleted from S3 when a superhero is deleted.

---

## Author

Babiuk Andrii
