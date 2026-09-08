# Local Setup Guide

Follow these steps to run the Portfolio Backend Server locally on your machine.

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v16 or higher recommended)
- **MongoDB** (Running locally, or a MongoDB Atlas URI)
- **Git**

You also need an account on **Cloudinary** for image hosting. Note down your Cloud Name, API Key, and API Secret.

## Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository_url>
   cd portfoilo-server
   ```

2. **Install NPM dependencies**:
   ```bash
   npm install
   ```

## Environment Configuration

1. In the root directory, you should have an `.env` file. If not, create one.
2. Populate the `.env` file with the following keys:

```env
# Server Port
PORT=5000

# Environment Mode (development or production)
NODE_ENV=development

# MongoDB Connection String
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio

# JWT Secret for Admin Authentication (Make this a strong, random string)
JWT_SECRET=your_super_secret_key_here

# Cloudinary Setup for File Uploads
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Allowed CORS Origin (Optional, defaults to '*')
CORS_ORIGIN=http://localhost:3000
```

## Running the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

If successful, the console should output:
```
◇ injected env (x) from .env
MongoDB connected !! DB HOST: 127.0.0.1
⚙️  Server is running at port : 5000
```

## Post-Setup Tasks

1. **Create an Admin User**:
   Open a tool like Postman or Insomnia, and send a `POST` request to `http://localhost:5000/api/v1/auth/register` with the following JSON body:
   ```json
   {
     "username": "admin",
     "email": "admin@example.com",
     "password": "securepassword123"
   }
   ```
2. **Login**:
   Use the `POST /api/v1/auth/login` endpoint with your email and password to receive your JWT `accessToken`. You will need to pass this token in the `Authorization: Bearer <token>` header to access protected routes.
