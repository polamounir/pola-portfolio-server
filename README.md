<div align="center">

# Pola Mounir — Portfolio Backend API Server

A production-grade, RESTful **Node.js** and **Express** backend API powering the personal developer portfolio and admin control panel, featuring **MongoDB**, **JWT authentication**, **Cloudinary integration**, and real-time **visitor analytics**.

[![Node.js](https://img.shields.io/badge/Node.js-v18.0.0+-339933.svg?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v4.19.2-000000.svg?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_v8.4.1-47A248.svg?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_Storage-3448C5.svg?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

[**Live API Host**](https://pola-mounir.vercel.app/) • [**GitHub Repository**](https://github.com/polamounir/pola-portfolio-server)

</div>

---

## Features

- **Controller-Service-Route Architecture**: Clean separation of concerns adhering to SOLID backend principles.
- **RESTful Endpoints**: Full CRUD support for Projects, Skills, Experiences, Navigation Links, Profile details, Alert Banners, and Custom Themes.
- **Authentication & Security**: JWT-based access & refresh token rotation, bcrypt password hashing, and CORS protection.
- **Cloudinary Media Storage**: Automated image optimization and document upload endpoints via Multer and Cloudinary SDK.
- **Visitor Analytics & Telemetry**: IP tracking, user-agent parsing, browser fingerprinting, and hit counter tracking.
- **Unified API Response Standard**: Standardized `ApiResponse` and `ApiError` utility wrappers for consistent client consumption.

---

## Technology Stack

| Category | Technology |
|---|---|
| **Runtime & Framework** | Node.js, Express.js |
| **Database & ODM** | MongoDB, Mongoose |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **File Storage** | Cloudinary, Multer |
| **Validation & Helpers** | Express Async Handler, Cors, Dotenv |

---

## API Routes Overview

| Base Endpoint | Method | Description | Auth Required |
|---|---|---|---|
| `/api/v1/auth/login` | `POST` | Authenticate admin user | No |
| `/api/v1/auth/refresh-token` | `POST` | Refresh JWT access token | No |
| `/api/v1/profile` | `GET / PUT` | Retrieve & update developer profile details | PUT only |
| `/api/v1/projects` | `GET / POST / PUT / DELETE` | Manage portfolio projects | POST / PUT / DELETE |
| `/api/v1/skills` | `GET / POST / PUT / DELETE` | Manage technical skills | POST / PUT / DELETE |
| `/api/v1/experiences` | `GET / POST / PUT / DELETE` | Manage work experience items | POST / PUT / DELETE |
| `/api/v1/navigation-links` | `GET / POST / PUT / DELETE` | Custom navigation links | POST / PUT / DELETE |
| `/api/v1/messages` | `GET / POST / DELETE` | Contact form submission & message inbox | GET / DELETE |
| `/api/v1/visitors` | `GET / POST` | Log visitor telemetry & retrieve statistics | GET only |
| `/api/v1/alert` | `GET / PUT` | Global maintenance banner alert settings | PUT only |
| `/api/v1/theme` | `GET / PUT` | Frontend portfolio color theme configuration | PUT only |

---

## Project Structure

```text
portfoilo-server/
├── docs/                    # Technical documentation
│   ├── API_REFERENCE.md     # Endpoint specifications & sample payloads
│   ├── ARCHITECTURE.md      # Data model schemas & system design
│   └── SETUP.md             # Detailed installation guide
├── public/                  # Static file uploads & sample resumes
├── src/
│   ├── config/              # MongoDB connection & Cloudinary config
│   ├── controllers/         # API Route Handlers
│   ├── middlewares/         # Auth, Error & Visitor logging middlewares
│   ├── models/              # Mongoose Database Schemas
│   ├── routes/              # Express Router definitions
│   ├── services/            # Business logic service layer
│   ├── utils/               # ApiError, ApiResponse & asyncHandler
│   ├── app.js               # Express application initialization
│   └── server.js            # Server entry point & DB bootstrap
├── seed.js                  # Database initial seed script
├── create-admin.js          # Admin account creation utility script
├── upload-project-images.js # Batch image upload utility
├── vercel.json              # Serverless configuration
└── package.json             # Server dependencies
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB instance (Local or MongoDB Atlas cluster)
- Cloudinary Account (for image & document uploads)

### Local Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/polamounir/pola-portfolio-server.git
   cd pola-portfolio-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root folder with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRE=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Seed initial database (Optional)**:
   ```bash
   node seed.js
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

---

## Contact & Developer Info

- **Developer**: Pola Mounir
- **Email**: [polamounir103@gmail.com](mailto:polamounir103@gmail.com)
- **LinkedIn**: [linkedin.com/in/pola-mounir-samir](https://www.linkedin.com/in/pola-mounir-samir/)
- **GitHub**: [github.com/polamounir](https://github.com/polamounir)

---

## License

This project is open-source under the [MIT License](LICENSE).