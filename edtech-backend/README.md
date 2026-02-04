# EduTech Backend API

Complete REST API for the EduTech platform built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based user authentication with role-based access (student/admin)
- **Course Management**: Full CRUD operations for courses
- **User Management**: User registration, profile management, wishlist, and course enrollment
- **Order Management**: Order creation, tracking, and payment handling
- **Secure**: Password hashing with bcryptjs, JWT tokens, and middleware protection

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edtech
JWT_SECRET=your_jwt_secret_key_change_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:8000,http://localhost:3000
```

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Create database: `use edtech`

### Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create account and free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Running the Server

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Courses
- `GET /api/courses` - Get all courses (with optional category filter)
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Users
- `GET /api/users/enrolled-courses` - Get enrolled courses
- `PUT /api/users/profile` - Update profile
- `POST /api/users/wishlist/add` - Add to wishlist
- `POST /api/users/wishlist/remove` - Remove from wishlist
- `PUT /api/users/course-progress` - Update course progress
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/my-orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (admin only)

## Authentication

Include JWT token in request header:
```
Authorization: Bearer <token>
```

## Response Format

### Success Response:
```json
{
  "message": "Success message",
  "data": {}
}
```

### Error Response:
```json
{
  "message": "Error message"
}
```

## Database Models

### User Schema
- id, name, email, password, role (student/admin)
- enrolledCourses, wishlist, createdAt

### Course Schema
- id, title, description, category
- price, duration, students, image
- instructor, modules, requirements, learningPoints

### Order Schema
- id, userId, courseId, amount, discount, tax
- totalAmount, paymentMethod, paymentStatus
- billingInfo, promoCode, createdAt

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control (RBAC)
- CORS configuration
- Input validation
- Error handling middleware

## Future Enhancements

- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Certificate generation
- [ ] Discussion forums
- [ ] Video streaming
- [ ] Rate limiting
- [ ] Logging system

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB service is running
- Check `MONGODB_URI` in `.env`
- For Atlas, whitelist IP address

### Port Already in Use
```bash
# Change PORT in .env
PORT=5001
```

### JWT Token Errors
- Ensure `JWT_SECRET` is set in `.env`
- Check token format in Authorization header

## License

ISC
