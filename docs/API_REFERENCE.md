# API Reference

This document outlines the available endpoints for the Portfolio Backend.
All endpoints share the same Base URL.

**Base URL**: `http://localhost:5000/api/v1`

## Unified Response Format

Every single API response guarantees this JSON structure:

```json
{
  "success": true, // Boolean: true if request succeeded, false otherwise
  "message": "Operation successful", // String message describing the result
  "data": { ... }, // Payload, null if error
  "error": null, // Error details, null if success
  "statusCode": 200 // HTTP status code integer
}
```

## Authentication

All `Admin-Only` endpoints require a Bearer token in the `Authorization` header.

```http
Authorization: Bearer <your_access_token>
```

### 1. Auth APIs
- `POST /auth/register` (Public) - Register an admin user. Body: `username`, `email`, `password`.
- `POST /auth/login` (Public) - Login admin. Body: `email`, `password`. Returns `accessToken`.

### 2. Profile APIs
- `GET /profile` (Public) - Fetch the singleton profile data.
- `PATCH /profile` (Admin-Only) - Update profile data. Accepts `multipart/form-data` for `avatarUrl` and `resumeUrl` files.

### 3. Navigation Links APIs
- `GET /navigation-links` (Public) - Get all header links sorted by order.
- `POST /navigation-links` (Admin-Only) - Create a new link. Body: `name`, `path`, `icon`, `order`.
- `PATCH /navigation-links/:id` (Admin-Only) - Update a link by ID.
- `DELETE /navigation-links/:id` (Admin-Only) - Delete a link by ID.

### 4. Projects APIs
- `GET /projects` (Public) - Get all projects.
- `GET /projects/:id` (Public) - Get a single project by ID.
- `POST /projects` (Admin-Only) - Create a project. Accepts `multipart/form-data` for `thumbnail` (1 image) and `gallery` (up to 10 images). Stringify arrays like `technologies` and `links`.
- `PATCH /projects/:id` (Admin-Only) - Update project by ID. Accepts `multipart/form-data`.
- `DELETE /projects/:id` (Admin-Only) - Delete a project by ID.

### 5. Experiences APIs
- `GET /experiences` (Public) - Get all experiences/education.
- `POST /experiences` (Admin-Only) - Create a new experience.
- `PATCH /experiences/:id` (Admin-Only) - Update an experience.
- `DELETE /experiences/:id` (Admin-Only) - Delete an experience.

### 6. Skills APIs
- `GET /skills` (Public) - Get all skills.
- `POST /skills` (Admin-Only) - Create a new skill.
- `PATCH /skills/:id` (Admin-Only) - Update a skill.
- `DELETE /skills/:id` (Admin-Only) - Delete a skill.

### 7. Visitors APIs (Analytics)
- `PATCH /visitors/:id` (Public) - Update a visitor's name. (Called by frontend after 30s). Body: `{ "name": "User Name" }`.
- `GET /visitors` (Admin-Only) - Fetch list of all tracked visitors and their IP/HitCounts.

### 8. Messages APIs (Contact Form)
- `POST /messages` (Public) - Send a new message. Body: `name`, `email`, `subject`, `content`.
- `GET /messages` (Admin-Only) - Get all submitted messages.
- `PATCH /messages/:id/read` (Admin-Only) - Mark a message as read.
- `DELETE /messages/:id` (Admin-Only) - Delete a message.
