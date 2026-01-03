Task Management Backend API

A robust and secure Task Management Backend System built using Node.js, Express, MongoDB, and JWT authentication.
This API allows users to register, authenticate, and manage their tasks with full CRUD functionality.

🚀 Features

🔐 User Authentication using JWT

👤 User Registration & Login

📋 Task Management (CRUD)

Create Task

Read Tasks

Update Task

Delete Task

🛡️ Protected Routes (Auth Middleware)

🗄️ MongoDB Database with Mongoose

⏱️ Automatic timestamps (createdAt, updatedAt)

📘 API Documentation (Swagger / Postman)

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB

ODM: Mongoose

Authentication: JSON Web Token (JWT)

Password Security: bcryptjs

Environment Config: dotenv

📁 Project Structure
task-manager-backend/
│── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── task.controller.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── task.routes.js
│   ├── app.js
│   └── server.js
│── postman_collection.json
│── swagger.yaml
│── .env
│── package.json
│── README.md

🗄️ Database Schema
Task Schema
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);

🔐 Authentication Flow

User registers or logs in

Server returns a JWT token

Token must be sent in request headers:

Authorization: Bearer <JWT_TOKEN>


Protected routes validate the token

📌 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user
Task Routes (Protected)
Method	Endpoint	Description
POST	/api/tasks	Create a new task
GET	/api/tasks	Get all user tasks
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task
🧪 Testing with Postman
Create Task Example

POST /api/tasks

Headers

Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json


Body (JSON)

{
  "title": "Learn Node.js",
  "description": "Build a task management backend",
  "completed": false
}

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

▶️ Run Locally
1️⃣ Clone Repository
git clone https://github.com/your-username/task-manager-backend.git

2️⃣ Install Dependencies
npm install

3️⃣ Start Server
npm run dev


Server will run on:

http://localhost:4000
