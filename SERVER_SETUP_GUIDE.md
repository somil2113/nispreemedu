# EdTech Platform - Server-Side Storage Setup

## 🚀 Quick Start Guide

### Backend Setup

#### 1. Install Dependencies
```bash
cd edtech-backend
npm install
```

#### 2. Set Up MongoDB
You have two options:

**Option A: Local MongoDB**
- Install MongoDB locally
- Ensure MongoDB is running on port 27017

**Option B: MongoDB Atlas (Cloud)**
- Go to https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a cluster
- Get your connection string
- Update `.env` with your connection string

#### 3. Configure Environment Variables
Create/Update `.env` file in `edtech-backend/`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/edtech
JWT_SECRET=your_super_secret_key_change_this_in_production
NODE_ENV=development
CORS_ORIGIN=http://localhost:8000,http://localhost:3000
```

#### 4. Seed Database with Courses
```bash
npm run seed
```

This will:
- Connect to MongoDB
- Clear existing courses
- Insert all 12 courses with complete data

#### 5. Start Backend Server
```bash
npm run dev
```

Expected output:
```
Server running on port 5000
Connected to MongoDB
```

---

### Frontend Setup

#### 1. Update Index.html
Replace the script reference from old to new:

Change this:
```html
<script src="script.js"></script>
```

To this:
```html
<script src="script-api.js"></script>
```

#### 2. Update login.html
Make sure login form uses the new API:
```html
<script src="script-api.js"></script>
<script>
    document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const result = await loginUser(email, password);
        if (result.success) {
            window.location.href = 'index.html';
        } else {
            alert(result.error);
        }
    });
</script>
```

#### 3. Update checkout.html
Make sure checkout form sends data to API:
```javascript
async function completeCheckout() {
    const user = getCurrentUser();
    if (!user) {
        alert('Please login first');
        return;
    }
    
    const course = JSON.parse(localStorage.getItem('selectedCourse'));
    const result = await createOrder({
        courseId: course.id,
        amount: course.price,
        discount: appliedDiscount || 0,
        tax: calculatedTax,
        paymentMethod: selectedPaymentMethod,
        billingInfo: billingData,
        promoCode: appliedPromoCode
    });
    
    if (result.success) {
        alert('Order placed successfully!');
        localStorage.removeItem('selectedCourse');
        window.location.href = 'user-dashboard.html';
    } else {
        alert('Error: ' + result.error);
    }
}
```

---

## 🔄 Data Flow

### Before (localStorage - Client-side)
```
User Input → Browser Memory → Page Reloads = Data Lost
```

### After (Server-side Storage)
```
User Input → API Request → MongoDB → Database Persistent
                            ↓
                        Multiple Users Supported
                        Real Authentication
                        Data Consistency
```

---

## 📝 Available API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses?category=ai-ml` - Get courses by category
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (admin only)
- `PUT /api/courses/:id` - Update course (admin only)
- `DELETE /api/courses/:id` - Delete course (admin only)

### Orders
- `POST /api/orders` - Create order and enroll
- `GET /api/orders` - Get user's orders

### Users
- `POST /api/users/wishlist/:courseId` - Add to wishlist
- `DELETE /api/users/wishlist/:courseId` - Remove from wishlist

---

## 🧪 Testing

### Test with cURL
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"123456"}'

# Get all courses
curl http://localhost:5000/api/courses

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"123456"}'
```

---

## ⚠️ Important Notes

1. **Token Storage**: Authentication tokens are stored in localStorage
2. **CORS**: Frontend must run on localhost:3000 or localhost:8000
3. **JWT Secret**: Change in production to a strong random key
4. **Database**: All data is now in MongoDB, not browser memory
5. **Multiple Users**: Different users have separate enrolled courses
6. **First User**: Automatically becomes admin

---

## 📊 Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "role": "student|admin",
  "enrolledCourses": [
    {
      "courseId": "ObjectId",
      "enrolledAt": "Date",
      "progress": "number"
    }
  ],
  "wishlist": ["ObjectId"],
  "createdAt": "Date"
}
```

### Courses Collection
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "category": "string",
  "price": "number",
  "duration": "string",
  "students": "string",
  "image": "URL",
  "instructor": "string",
  "modules": [...],
  "requirements": [...],
  "learningPoints": [...],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Orders Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "courseId": "ObjectId",
  "amount": "number",
  "discount": "number",
  "tax": "number",
  "totalAmount": "number",
  "paymentMethod": "string",
  "billingInfo": "object",
  "promoCode": "string",
  "paymentStatus": "pending|completed|failed",
  "createdAt": "Date"
}
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Solution: Check if MongoDB is running
Local: mongod
Atlas: Check connection string in .env
```

### CORS Error
```
Solution: Update CORS_ORIGIN in .env to match your frontend port
```

### Token Expired
```
Solution: User needs to login again (token expires in 7 days)
```

### Courses Not Loading
```
Solution: Run npm run seed to populate database
```

---

## ✅ Verification Checklist

- [ ] MongoDB running
- [ ] Backend started with `npm run dev`
- [ ] Database seeded with courses
- [ ] Frontend using script-api.js
- [ ] Can register new user
- [ ] Can login
- [ ] Can see courses from database
- [ ] Can purchase course
- [ ] Data persists after page refresh
- [ ] Admin can create/delete courses

---

## Next Steps

1. ✅ Backend and Database (COMPLETED)
2. 🔜 Payment Gateway Integration (Stripe/Razorpay)
3. 🔜 Email Notifications
4. 🔜 Video Streaming Integration
5. 🔜 Certificate Generation
6. 🔜 Production Deployment

