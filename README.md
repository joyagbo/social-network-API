# Social-Network-API

## Table of Contents

- [OVERVIEW](#overview)
- [Technologies Used](#technology-used)
- [ENDPOINTS](#endpoint)
- [POSTMAN Documentation](#postman-documentation)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)

### OVERVIEW

The Social Network API is built with Node.js and Express.js, utilizing MongoDB as the database and Mongoose as the ORM. This API serves as the backend for a social network platform, providing registration, authentication, and post sharing functionalities.

### Technologies Used

- **LANGUAGES**: Node.js
- **DATABASES**: MongoDB
- **ORM**: Mongoose
- **FRAMEWORK**: Express.js
- **BASE_URL**:

### Important Information

- Users must have a verified email to access the platform.
- Authentication involves invloves token from.
- To post or perform other actions requiring authentication, the user must include a Bearer Token in the request headers.

### ENDPOINTS

### User Endpoints

- **POST /sign-up**: Register a new user.
- **POST /sign-in**: Log in a user and receive a JWT token.

### Post Endpoints

- **POST /create-post**: Create a new post. Requires a Bearer Token.
- **PUT /update-post/:postId**: Update an existing post by its ID. Requires a Bearer Token.
- **GET /all-posts**: Retrieve all posts.
- **GET /get-a-post/:postId**: Retrieve a specific post by its ID.
- **DELETE /delete-post/:postId**: Delete a specific post by its ID. Requires a Bearer Token.

## Testing and Running the Project

To set up the Social Network API locally, follow these steps:

### Prerequisites

1. **Node.js**: Ensure that Node.js is installed on your system. You can download it from [Node.js official website](https://nodejs.org/).
2. **MongoDB**: Ensure that MongoDB is installed and running. You can download it from [MongoDB official website](https://www.mongodb.com/).

### Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>

   ```

2. **Navigate to the Project Directory**:
   cd social-network-api

3. **Install Dependencies**:
   npm install

### POSTMAN Documentation

For detailed API usage and examples, refer to the Postman documentation [here](#).

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>
PORT=<your-preferred-port>

### Running the Project

**Start the Server**
To start the server, run the following command:
nodemon server

**Accessing the API**
Once the server is running, you can access the API at:
http://localhost:<PORT>
