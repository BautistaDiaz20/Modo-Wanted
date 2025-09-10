# User Search Backend

## Overview
This project is a backend application for managing user data. It provides a RESTful API for performing CRUD operations on user information. The application is built using Node.js and Express, and it interacts with a MongoDB database using Mongoose.

## Project Structure
```
user-search-backend
├── src
│   ├── controllers        # Contains the logic for handling user-related requests
│   ├── models             # Defines the User model and schema
│   ├── routes             # Contains the API routes for user operations
│   ├── config             # Configuration files, including database connection
│   ├── app.js             # Main application file that initializes Express
│   └── server.js          # Entry point for starting the server
├── package.json           # Project metadata and dependencies
├── .env                   # Environment variables for configuration
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd user-search-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=5000
   MONGODB_URI=<your-mongodb-connection-string>
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## API Endpoints

### Users
- **GET /api/users**: Retrieve all users
- **GET /api/users/:id**: Retrieve a user by ID
- **POST /api/users**: Create a new user
- **PUT /api/users/:id**: Update an existing user
- **DELETE /api/users/:id**: Delete a user by ID

## Usage Examples

### Retrieve all users
```bash
curl -X GET http://localhost:5000/api/users
```

### Create a new user
```bash
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john@example.com"}'
```

## License
This project is licensed under the MIT License.