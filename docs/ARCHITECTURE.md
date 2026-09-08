# Application Architecture

This project is built using Node.js and Express, following a scalable, modular architecture. The separation of concerns makes it easy to maintain, test, and expand.

## Folder Structure

```text
portfoilo-server/
│
├── src/
│   ├── config/          # Configurations (MongoDB, Cloudinary settings)
│   ├── controllers/     # Request handlers (processes req, calls service, returns res)
│   ├── middlewares/     # Express middlewares (Error handler, Auth, Visitor Tracking)
│   ├── models/          # Mongoose database schemas
│   ├── routes/          # Express route definitions
│   ├── services/        # Business logic and complex database interactions
│   ├── utils/           # Helper classes (ApiResponse, ApiError, asyncHandler)
│   ├── app.js           # Express app setup and middleware registration
│   └── server.js        # Entry point to start the Node.js server
│
├── docs/                # Project documentation
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
└── README.md            # Main entry documentation
```

## Design Patterns

### 1. Controller-Service-Route Pattern
- **Routes** (`src/routes/`): Define the HTTP endpoints (e.g., `GET /api/v1/projects`) and attach middlewares (e.g., auth, multer) and controller functions.
- **Controllers** (`src/controllers/`): Handle the incoming HTTP Request object. They extract data, call the appropriate Service function, and return the formatted Response.
- **Services** (`src/services/`): Handle the core business logic. They interact with the Mongoose Models to fetch or manipulate data. This abstraction keeps controllers thin.

### 2. Standardized Responses
Every controller utilizes the `ApiResponse` utility class to ensure that the frontend always receives data in the exact same JSON format, regardless of the endpoint.

### 3. Global Error Handling
The `asyncHandler` wrapper catches any unhandled promise rejections inside controllers and passes them to the global `errorHandler` middleware. The error handler formats the error using the `ApiError` utility and ensures that even failures return a response matching the standardized structure.

## Database Models

The project utilizes MongoDB (via Mongoose) to store data.
- **User**: Represents the Admin user for the dashboard.
- **Profile**: A singleton document storing basic info, hero sections, and social links.
- **NavigationLink**: Dynamic links for the website header.
- **Project**: Represents portfolio projects. Supports multiple image uploads.
- **Experience**: Represents job history or education data.
- **Skill**: Represents technical skills with categories and icons.
- **Message**: Stores contact form submissions.
- **Visitor**: Stores visitor analytics (IP, Fingerprint, Name updates).

## Middleware Flow

1. Incoming Request -> `cors` & body parsers.
2. -> `visitorTracker` (Logs IP and User-Agent into the database).
3. -> Specific Routes.
4. -> `verifyJWT` (If the route requires Admin authentication).
5. -> `multer` (If the route expects file uploads).
6. -> `Controller`.
7. -> Output JSON Response OR -> `errorHandler` (If an exception is thrown).
