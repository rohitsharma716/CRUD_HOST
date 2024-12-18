# Express Authentication API

A RESTful API built with Node.js, Express, MongoDB, and Passport JWT authentication.

## Features

- User authentication using JWT (JSON Web Tokens)
- Password hashing with bcrypt
- MongoDB database integration using Mongoose
- RESTful API architecture
- Protected routes with Passport middleware
- Input validation and sanitization
- Error handling middleware

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone c:\Users\Rohit Sharma\Downloads\nodejs-express-readme.md
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotels
JWT_SECRET=12345
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Start in production mode:
```
nodemon server.js
```


## Dependencies

- express: Web framework for Node.js
- mongoose: MongoDB object modeling
- passport: Authentication middleware
- passport-jwt: Passport strategy for JWT
- jsonwebtoken: JWT implementation
- bcryptjs: Password hashing
- dotenv: Environment variable management
- cors: Cross-origin resource sharing
- express-validator: Input validation

## Development Dependencies

- nodemon: Development server with auto-reload
- jest: Testing framework
- supertest: HTTP testing library

## Error Handling

The application includes centralized error handling middleware that processes:
- Validation errors
- Authentication errors
- Database errors
- General application errors

## Security Measures

- Password hashing using bcrypt
- JWT token authentication
- Request rate limiting
- CORS configuration
- HTTP security headers
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
